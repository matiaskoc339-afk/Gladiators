"""Prueba opcional del flujo real en Chromium. Requiere el servidor iniciado y Playwright."""
import argparse
import json
import os
from pathlib import Path
from playwright.sync_api import sync_playwright

parser = argparse.ArgumentParser()
parser.add_argument('--base-url', default='http://127.0.0.1:8000')
parser.add_argument('--screenshots', type=Path)
args = parser.parse_args()

with sync_playwright() as p:
    launch = {'headless': True, 'args': ['--disable-dev-shm-usage']}
    if os.environ.get('CHROMIUM_PATH'):
        launch['executable_path'] = os.environ['CHROMIUM_PATH']
    browser = p.chromium.launch(**launch)
    page = browser.new_page(viewport={'width': 1440, 'height': 1000})
    errors = []
    page.on('pageerror', lambda error: errors.append(str(error)))
    page.on('dialog', lambda dialog: dialog.accept())

    def snapshot():
        return page.evaluate('JSON.parse(localStorage.getItem("casa-ceniza-v1"))')

    def nav(screen):
        page.locator(f'.sidebar [data-page="{screen}"]').first.click()

    def capture(name):
        if args.screenshots:
            args.screenshots.mkdir(parents=True, exist_ok=True)
            page.screenshot(path=str(args.screenshots / f'{name}.png'), full_page=True)

    page.goto(args.base_url, wait_until='networkidle')
    page.get_by_role('button', name='Nueva partida', exact=True).click()
    assert snapshot()['gold'] == 1500
    capture('base')
    nav('market')
    capture('mercado')
    page.locator('[data-action="buy-gladiator"]').first.click()
    first_id = snapshot()['gladiators'][0]['id']
    # Tras la compra del ladrón, el estafador arcano está en la segunda tarjeta.
    page.locator('[data-action="buy-gladiator"]').nth(1).click()
    assert len(snapshot()['gladiators']) == 2
    mage_id = snapshot()['gladiators'][1]['id']
    nav('training')
    page.locator('#gladiator-select').select_option(first_id)
    initial_strength = snapshot()['gladiators'][0]['stats']['strength']
    page.locator('[data-action="assign"][data-stat="strength"]').click()
    for _ in range(10):
        page.locator('[data-action="day"]').click()
    assert snapshot()['gladiators'][0]['stats']['strength'] > initial_strength
    page.locator('[data-action="upgrade"][data-stat="strength"]').click()
    nav('shops')
    page.locator('[data-action="buy-item"][data-id="dagger"]').click()
    page.locator('[data-action="shop-tab"][data-category="scroll"]').click()
    page.locator('[data-action="buy-item"][data-id="spell-spark"]').click()
    nav('inventory')
    page.locator('[data-action="equip"]').first.click()
    assert snapshot()['gladiators'][0]['equipment']['weapon']
    page.locator('#gladiator-select').select_option(mage_id)
    page.locator('[data-action="learn"]').click()
    assert 'spell-spark' in snapshot()['gladiators'][1]['activeSpells']
    assert not any(u['itemId'] == 'spell-spark' for u in snapshot()['inventory'])
    nav('gladiators')
    page.locator('[data-tactic="magic"]').fill('90')
    page.locator('[data-tactic="magic"]').dispatch_event('change')
    assert snapshot()['gladiators'][1]['tactics']['magic'] == 90
    capture('ficha')
    for width in [1440, 1024, 390]:
        page.set_viewport_size({'width': width, 'height': 1000})
        for screen in ['base', 'gladiators', 'market', 'training', 'shops', 'inventory', 'arena', 'tournaments', 'history']:
            nav(screen)
            assert page.locator('h1').count() == 1, screen
            assert not page.evaluate('document.documentElement.scrollWidth > innerWidth'), (width, screen)
    page.set_viewport_size({'width': 1440, 'height': 1000})
    nav('arena')
    page.locator('#gladiator-select').select_option(first_id)
    page.locator('[data-action="duel"]:not([disabled])').first.click()
    page.locator('[data-action="speed"][data-speed="4"]').click()
    page.wait_for_timeout(1200)
    page.locator('[data-action="pause"]').click()
    turn = snapshot()['battle']['turn']
    page.wait_for_timeout(500)
    assert snapshot()['battle']['turn'] == turn
    page.locator('#reasoning').uncheck()
    assert not snapshot()['options']['reasoning']
    page.locator('#reasoning').check()
    capture('combate')
    page.reload(wait_until='networkidle')
    page.get_by_role('button', name='Continuar partida', exact=True).click()
    nav('arena')
    page.wait_for_function('JSON.parse(localStorage.getItem("casa-ceniza-v1")).battle.settled === true', timeout=60000)
    result = snapshot()
    assert len(result['battles']) == 1
    assert result['battle']['payout']['gold'] >= 18
    capture('resultado')
    nav('options')
    with page.expect_download() as download:
        page.locator('[data-action="export"]').click()
    downloaded = download.value
    exported = Path(downloaded.path()).read_bytes()
    assert json.loads(exported)['id'] == result['id']
    page.locator('#import-file').set_input_files({'name': 'partida.json', 'mimeType': 'application/json', 'buffer': exported})
    assert snapshot()['id'] == result['id']
    # Comprobar validación sin destruir la partida existente.
    page.locator('#import-file').set_input_files({'name': 'danada.json', 'mimeType': 'application/json', 'buffer': b'{"version":1}'})
    page.get_by_role('alert').filter(has_text='No se pudo importar').wait_for()
    assert snapshot()['id'] == result['id']
    assert not errors, errors
    print(json.dumps({'resultado': 'correcto', 'errores_javascript': errors, 'gladiadores': len(result['gladiators']), 'turnos': result['battle']['turn'], 'oro': result['gold'], 'dia': result['day']}, ensure_ascii=False))
    browser.close()
