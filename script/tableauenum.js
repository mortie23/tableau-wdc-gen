/** Source: https://connectors.tableau.com/libs/tableauwdc-2.3.latest.js */
/** 
 * This file lists all of the enums which should available for the WDC 
 * After cetting the version from the source, the values are replcaed with the full reference values
 * The strings are wrapped with \! simply to be able to remove the quotes later
*/
const tableau = {
  phaseEnum: {
    interactivePhase: "\!tableau.phaseEnum.interactive\!",
    authPhase: "\!tableau.phaseEnum.auth\!",
    gatherDataPhase: "\!tableau.phaseEnum.gatherData\!",
  },

  authPurposeEnum: {
    ephemeral: "\!tableau.authPurposeEnum.ephemeral\!",
    enduring: "\!tableau.authPurposeEnum.enduring\!",
  },

  authTypeEnum: {
    none: "\!tableau.authTypeEnum.none\!",
    basic: "\!tableau.authTypeEnum.basic\!",
    custom: "\!tableau.authTypeEnum.custom\!",
  },

  dataTypeEnum: {
    bool: "\!tableau.dataTypeEnum.bool\!",
    date: "\!tableau.dataTypeEnum.date\!",
    datetime: "\!tableau.dataTypeEnum.datetime\!",
    float: "\!tableau.dataTypeEnum.float\!",
    int: "\!tableau.dataTypeEnum.int\!",
    string: "\!tableau.dataTypeEnum.string\!",
    geometry: "\!tableau.dataTypeEnum.geometry\!",
  },

  columnRoleEnum: {
    dimension: "\!tableau.columnRoleEnum.dimension\!",
    measure: "\!tableau.columnRoleEnum.measure\!",
  },

  columnTypeEnum: {
    continuous: "\!tableau.columnTypeEnum.continuous\!",
    discrete: "\!tableau.columnTypeEnum.discrete\!",
  },

  aggTypeEnum: {
    sum: "\!tableau.aggTypeEnum.sum\!",
    avg: "\!tableau.aggTypeEnum.avg\!",
    median: "\!tableau.aggTypeEnum.median\!",
    count: "\!tableau.aggTypeEnum.count\!",
    countd: "\!tableau.aggTypeEnum.count_dist\!",
  },

  geographicRoleEnum: {
    area_code: "\!tableau.geographicRoleEnum.area_code\!",
    cbsa_msa: "\!tableau.geographicRoleEnum.cbsa_msa\!",
    city: "\!tableau.geographicRoleEnum.city\!",
    congressional_district: "\!tableau.geographicRoleEnum.congressional_district\!",
    country_region: "\!tableau.geographicRoleEnum.country_region\!",
    county: "\!tableau.geographicRoleEnum.county\!",
    state_province: "\!tableau.geographicRoleEnum.state_province\!",
    zip_code_postcode: "\!tableau.geographicRoleEnum.zip_code_postcode\!",
    latitude: "\!tableau.geographicRoleEnum.latitude\!",
    longitude: "\!tableau.geographicRoleEnum.longitude\!",
  },

  unitsFormatEnum: {
    thousands: "\!tableau.unitsFormatEnum.thousands\!",
    millions: "\!tableau.unitsFormatEnum.millions\!",
    billions_english: "\!tableau.unitsFormatEnum.billions_english\!",
    billions_standard: "\!tableau.unitsFormatEnum.billions_standard\!",
  },

  numberFormatEnum: {
    number: "\!tableau.numberFormatEnum.number\!",
    currency: "\!tableau.numberFormatEnum.currency\!",
    scientific: "\!tableau.numberFormatEnum.scientific\!",
    percentage: "\!tableau.numberFormatEnum.percentage\!",
  },

  localeEnum: {
    america: "\!tableau.localeEnum.en-us\!",
    brazil: "\!tableau.localeEnum.pt-br\!",
    china: "\!tableau.localeEnum.zh-cn\!",
    france: "\!tableau.localeEnum.fr-fr\!",
    germany: "\!tableau.localeEnum.de-de\!",
    japan: "\!tableau.localeEnum.ja-jp\!",
    korea: "\!tableau.localeEnum.ko-kr\!",
    spain: "\!tableau.localeEnum.es-es\!",
  },

  joinEnum: {
    inner: "\!tableau.joinEnum.inner\!",
    left: "\!tableau.joinEnum.left\!",
  },
};

module.exports.tableau = tableau;
