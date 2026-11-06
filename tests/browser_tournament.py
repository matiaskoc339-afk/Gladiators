"""Verifica un torneo completo mediante una partida de prueba importada por la interfaz."""
import json
import os
from playwright.sync_api import sync_playwright
with sync_playwright() as p:
    options={'headless':True,'args':['--disable-dev-shm-usage']}
    if os.environ.get('CHROMIUM_PATH'): options['executable_path']=os.environ['CHROMIUM_PATH']
    browser=p.chromium.launch(**options)
    page=browser.new_page(viewport={'width':1440,'height':1000})
    errors=[]
    page.on('pageerror',lambda e: errors.append(str(e)))
    page.goto(os.environ.get('BASE_URL','http://127.0.0.1:8000'),wait_until='networkidle')
    fixture=page.evaluate('''async () => {
      const {createGame}=await import('./js/gameState.js');
      const {seeded}=await import('./js/utils.js');
      const {buyGladiator,buyItem,equip}=await import('./js/economy/management.js');
      const s=createGame(seeded(15)),g=buyGladiator(s,s.market[0].id);
      s.gold=20000;for(const k in g.stats)g.stats[k]=40;
      equip(s,g.id,buyItem(s,'imperial').id);equip(s,g.id,buyItem(s,'chest-3').id);
      s.options.speed=4;return JSON.stringify(s);
    }''')
    page.locator('#import-file').set_input_files({'name':'fixture.json','mimeType':'application/json','buffer':fixture.encode()})
    page.locator('nav [data-page="tournaments"]').click()
    assert page.locator('[data-action="tournament"][data-id="grand"]').is_disabled()
    page.locator('[data-action="tournament"][data-id="regional"]').click()
    for i in range(2):
        page.wait_for_function('JSON.parse(localStorage.getItem("casa-ceniza-v1")).battle.settled === true',timeout=60000)
        snapshot=page.evaluate('JSON.parse(localStorage.getItem("casa-ceniza-v1"))')
        assert snapshot['battle']['result']['winner']==0
        if i==0:
            assert snapshot['tournament']['round']==1
            page.locator('[data-action="next-round"]').click()
    assert snapshot['tournament'] is None
    assert snapshot['completed'][0]['id']=='regional'
    assert snapshot['battle']['payout']['bonus']==280
    if os.environ.get('SCREENSHOT_PATH'): page.screenshot(path=os.environ['SCREENSHOT_PATH'],full_page=True)
    assert not errors,errors
    print(json.dumps({'torneo':'Copa de las Cenizas','rondas':len(snapshot['battles']),'bonificacion':snapshot['battle']['payout']['bonus'],'prestigio':snapshot['prestige'],'errores_javascript':errors},ensure_ascii=False))
    browser.close()
