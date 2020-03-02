const units = [
  {
    name: 'Kilogram',
    value: 'Kg'
  },
  {
    name: 'Litre',
    value: '1/2L'
  },
  {
    name: 'Grams',
    value: 'gram'
  },
  {
    name: 'Mili Litre',
    value: 'mL'
  }, {
    name: 'Pounds',
    value: 'lb'
  }
]

class Unit {
  static getUnits() {
    return units;
  }

  static getUnitName(unit) {
    if (!unit) return;
    return units.find((u) => u.value.toLowerCase() === unit.toLowerCase()).name;
  }
}

export default Unit;