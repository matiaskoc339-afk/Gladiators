"""Regresión: abrir index.html desde el disco y completar un duelo sin servidor."""
import argparse
import json
import os
import time
from pathlib import Path
from tempfile import TemporaryDirectory
from shutil import copyfile
from selenium import webdriver
from selenium.webdriver.common.by import By
from selenium.webdriver.firefox.options import Options
from selenium.webdriver.firefox.service import Service
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC

parser = argparse.ArgumentParser()
parser.add_argument('--index', type=Path, default=Path(__file__).resolve().parents[1] / 'index.html')
parser.add_argument('--screenshot', type=Path)
args = parser.parse_args()
options = Options()
options.add_argument('-headless')
if os.environ.get('FIREFOX_PATH'):
    options.binary_location = os.environ['FIREFOX_PATH']
service = Service(executable_path=os.environ['GECKODRIVER_PATH']) if os.environ.get('GECKODRIVER_PATH') else Service()
driver = webdriver.Firefox(options=options, service=service)
wait = WebDriverWait(driver, 60)

def click(selector):
    wait.until(EC.element_to_be_clickable((By.CSS_SELECTOR, selector))).click()

def state():
    return driver.execute_script('return JSON.parse(localStorage.getItem("casa-ceniza-v1"))')

try:
    driver.set_window_size(1440, 1000)
    driver.get(args.index.resolve().as_uri())
    wait.until(lambda d: d.find_element(By.ID, 'app').get_attribute('data-ready') == 'true')
    assert driver.current_url.startswith('file:')
    assert driver.execute_script('return [...document.scripts].every(s => s.type !== "module")')
    click('[data-action="new-game"]')
    assert state()['gold'] == 1500
    click('nav [data-page="market"]')
    click('[data-action="buy-gladiator"]')
    gladiator = state()['gladiators'][0]
    click('nav [data-page="training"]')
    click('[data-action="assign"][data-stat="strength"]')
    click('[data-action="day"]')
    assert state()['gladiators'][0]['statXP']['strength'] > 0
    click('nav [data-page="shops"]')
    click('[data-action="buy-item"][data-id="dagger"]')
    click('nav [data-page="inventory"]')
    click('[data-action="equip"]')
    assert state()['gladiators'][0]['equipment']['weapon']
    save_id = state()['id']
    driver.refresh()
    click('[data-action="continue"]')
    assert state()['id'] == save_id
    assert state()['day'] == 2
    click('nav [data-page="arena"]')
    click('[data-action="duel"]:not([disabled])')
    click('[data-action="speed"][data-speed="4"]')
    wait.until(lambda d: state()['battle']['turn'] >= 2)
    click('[data-action="pause"]')
    turn = state()['battle']['turn']
    time.sleep(.5)
    assert state()['battle']['turn'] == turn
    click('[data-action="pause"]')
    wait.until(lambda d: state()['battle'].get('settled', False))
    result = state()
    assert len(result['battles']) == 1
    assert result['battle']['payout']['gold'] >= 18
    if args.screenshot:
        driver.save_screenshot(str(args.screenshot))
    # Una distribución incompleta informa del error en lugar de quedar vacía.
    with TemporaryDirectory(prefix='ceniza-arranque-') as directory:
        broken = Path(directory)
        (broken / 'js').mkdir()
        copyfile(args.index, broken / 'index.html')
        copyfile(args.index.parent / 'style.css', broken / 'style.css')
        copyfile(args.index.parent / 'js' / 'boot.js', broken / 'js' / 'boot.js')
        driver.get((broken / 'index.html').as_uri())
        wait.until(lambda d: d.find_element(By.ID, 'boot-status').get_attribute('role') == 'alert')
        assert 'No se pudo iniciar' in driver.find_element(By.ID, 'boot-status').text
    print(json.dumps({'protocolo': 'file://', 'resultado': 'correcto', 'navegador': driver.capabilities['browserName'], 'version': driver.capabilities['browserVersion'], 'gladiador': gladiator['name'], 'turnos': result['battle']['turn'], 'guardado_tras_recarga': True, 'aviso_si_faltan_archivos': True}, ensure_ascii=False))
finally:
    driver.quit()
