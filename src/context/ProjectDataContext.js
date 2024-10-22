import React, { useState, useEffect, useContext } from "react";
import * as appSetup from "../custom/appSetup";
import { LivestateContext } from "./LivestateContext";

let initialState = {
  config: {
    mode: "production",
    ui: {
      tooltipWidth: 300,
      sidebarWidth: 400,
    },
  },
  project: {
    dsc: "Im Eichacher, Aesch",
    adress: "",
    backgroundImages: [
      "f1001",
      "f1002",
      "f1003",
      "f1004",
      "f1005",
      "f1006",
      "f1007",
      "f1008",
    ],
    settings: {
      statustable: {
        free: {
          id: "0",
          dsc: "verfügbar",
          colorCode: "g",
          contact: "1",
          price: "1",
          tour: "1",
        },
        reserved: {
          id: "1",
          dsc: "reserviert",
          colorCode: "y",
          contact: "0",
          price: "0",
          tour: "0",
        },
        rented: {
          id: "2",
          dsc: "vermietet",
          colorCode: "r",
          contact: "0",
          price: "0",
          tour: "1",
        },
        sold: {
          id: "3",
          dsc: "verkauft",
          colorCode: "r",
          contact: "0",
          price: "0",
          tour: "1",
        },
        unknown: {
          id: "4",
          dsc: "unbekannt",
          colorCode: "r",
          contact: "0",
          price: "0",
          tour: "0",
        },
      },
    },
    location: {
      url: "https://www.google.com/maps/place/Ochsenrainstrasse+7%2F7b,+8136+Gattikon/data=!4m2!3m1!1s0x479aa7d881e13251:0x840eb6ae9d9fe6a2?sa=X&ved=2ahUKEwi9isSlk9n9AhUShv0HHdA0BBYQ8gF6BAgJEAI",
      street: "Ochsenrainstrasse 7a + 7b",
      city: "8136 Gattikon-Thalwil",
    },
  },
  plans: {
    factsheet: {},
    situation_plan: "",
    basement1_plan: "",
    basement2_plan: "",
    basement3_plan: "",
    environment_plan: "",
  },
  tours: {
    "Whg. 102":
      "https://client.echt3d.ch/0428_LerchPromo_Eichacher_Aesch_Rundgang/",
  },

  units: {
    1: {
      adress: "",
      area: "90.44",
      custom_1: "",
      custom_2: "",
      custom_3: "97.5",
      custom_4: "8",
      custom_5: "",
      custom_6: "",
      document: "",
      dsc: "WHG 1",
      floor: "3",
      id: "1",
      name: "WHG 1",
      player: "",
      price: "1'980'000",
      price_per_sm: "",
      rooms: "4.5",
      se_id: "0301",
      status: "5",
      tour: "",
      tour_2: "",
      type: "Wohnung",
      url_1: "",
      url_2: "",
      url_3: "",
    },
  },
  svg: {
    f1001: {
      "Whg. 201":
        "M1576.18,880.843L1500.72,932.161L1500.44,928.339L1421.56,947.098L1398.8,947.239L1399.61,934.614L1564.53,821.25L1653.87,882.7L1722.48,898.459L1735.88,931.634L1735.67,936.943L1727.42,935.063L1731.38,945.183L1722.78,945.236L1696.65,945.398L1689.19,945.443L1671.18,945.555L1576.18,880.843Z",
      "Whg. 202":
        "M1671.18,945.555L1689.19,945.444L1696.65,945.398L1722.78,945.236L1731.38,945.183L1789.45,944.824L1798.37,1058.03L1821.48,1113.33L1821.12,1119.52L1803.23,1119.66L1804.16,1131.43L1803.76,1138.59L1800.35,1138.62L1773.78,1138.83L1507.84,1140.91L1507.85,1133.73L1506.84,1081.05L1498.1,1081.12L1498.1,1074.92L1496.57,1033.2L1505.93,1033.14L1504.26,946.587L1514.3,946.525L1580.28,901.815L1640.42,942.638L1634.52,920.585L1671.18,945.555ZM1508.19,1081.04L1508.77,1110.69L1508.82,1081.04L1508.19,1081.04Z",
      "Whg. 203":
        "M1192.96,1055.64L1197.76,948.481L1398.8,947.239L1421.56,947.098L1501.83,946.602L1504.26,946.587L1505.93,1033.14L1496.57,1033.2L1496.57,1034.07L1496.74,1043.83L1498.1,1081.12L1506.84,1081.05L1507.85,1133.73L1507.84,1140.91L1219.25,1143.16L1189.75,1143.39L1189.36,1136.2L1189.61,1130.5L1192.96,1055.64ZM1169.25,1118.29L1188.41,1055.67L1192.96,1055.64L1190.16,1118.13L1189.88,1124.36L1169.62,1124.51L1169.25,1118.29Z",
      "Whg. 103":
        "M1172.17,1167.45L1182.32,1126.14L1189.36,1126.33L1189.75,1143.39L1219.25,1143.16L1507.37,1140.91L1507.27,1208.91L1465.2,1209.26L1465.5,1224.65L1465.54,1230.9L1301.42,1232.31L1301.2,1226.06L1303.4,1210.62L1219.75,1211.3L1219.02,1194.1L1173.77,1194.49L1172.17,1167.45Z",
      "Whg. 102":
        "M1771.27,1189.56L1770.42,1206.7L1669.86,1207.55L1668.48,1201.42L1669.86,1207.55L1673.32,1222.88L1673.12,1229.12L1509.58,1230.52L1509.6,1224.28L1508.23,1202.76L1508.23,1208.9L1507.27,1208.91L1507.37,1140.91L1507.84,1140.91L1773.78,1138.83L1800.35,1138.62L1817.43,1183.14L1817.09,1189.18L1771.27,1189.56Z",
      "Whg. 9901":
        "M1773.78,1373.75C1706.43,1389.86 1631.63,1401.01 1552.5,1409.26L1148.29,1457.5L1103.98,1405.15L1049.04,1379.98L1035.82,1233.52L1220.7,1236.21L1222.94,1280.48L1305.96,1279.76L1303.75,1296.57L1303.98,1302.66L1465.97,1301.17L1465.93,1295.09L1465.62,1278.33L1507.16,1277.95L1508.11,1277.94L1509.45,1300.78L1670.88,1299.3L1671.08,1293.21L1667.58,1276.51L1767,1275.62L1765.32,1309.54L1839.31,1309.54L1881.25,1350L1773.78,1373.75Z",
      "Whg. 3":
        "M1219.75,1211.3L1220.41,1230.39L1035.82,1233.52L1038.33,1165.55L1173.78,1160.89L1172.17,1167.45L1173.77,1194.49L1219.02,1194.1L1219.75,1211.3ZM1219.75,1211.3L1303.4,1210.62L1301.2,1226.06L1301.42,1232.31L1465.54,1230.9L1465.5,1224.65L1465.2,1209.26L1507.27,1208.91L1507.16,1277.95L1465.62,1278.33L1465.5,1272.34L1465.93,1295.09L1465.97,1301.17L1303.98,1302.66L1303.75,1296.57L1305.96,1279.76L1222.94,1280.48L1219.75,1211.3Z",
      "Whg. 2":
        "M1770.42,1267.5L1767,1275.62L1667.58,1276.51L1671.08,1293.21L1670.88,1299.3L1509.45,1300.78L1509.46,1294.68L1508.12,1271.96L1508.11,1277.94L1507.16,1277.95L1507.27,1208.91L1508.23,1208.9L1509.58,1230.52L1673.12,1229.12L1673.32,1222.88L1669.86,1207.55L1770.42,1206.7L1771.27,1189.56L1817.43,1188.75L1817.43,1182.5L1800.35,1138.62L1803.75,1138.62L1804.16,1131.43L1803.23,1119.66L1821.12,1119.52L2047.7,1114.82C2070.53,1141.35 2080.14,1169.66 2068.93,1200.77L2013.75,1251.63L1846.25,1268.75L1770.42,1267.5Z",
      "Whg. 1":
        "M1821.12,1119.52L1821.82,1112.71L1798.37,1058.03L1795.54,1022.04L1830.64,1020.04C1893.48,1021.63 1958.78,1044.65 2026.3,1087.09L2047.7,1114.82L1821.12,1119.52Z",
    },
    f1002: {
      "Whg. 202":
        "M1238.54,1033.57L1282.96,1000.35L1290.2,1001.91L1332.06,925.53L1395.9,937.715L1484.59,904.88L1533.88,954.116L1575.77,936.906L1679.31,1039.28L1679.17,1045.72L1635.39,1068.09L1624.33,1062.38L1591.6,1078.88L1626.12,1086.45L1626.03,1092.41L1527.39,1144.04L1483.31,1133.42L1477.35,1136.43L1469.05,1153.08L1242.1,1096.91L1241.87,1090.09L1253.83,1068.28L1252.98,1042.69L1238.74,1039.4L1238.54,1033.57Z",
      "Whg. 203":
        "M1029.01,1037.85L1119.98,885.051L1332.06,925.53L1290.2,1001.91L1282.96,1000.35L1238.54,1033.57L1238.74,1039.4L1252.98,1042.68L1253.83,1068.28L1241.87,1090.09L1242.1,1096.91L1029.41,1044.27L1029.01,1037.85Z",
      "Whg. 201":
        "M1679.31,1039.28L1527.36,889.046L1651.55,843.064L1745.3,933.083L1764.83,941.653L1764.65,946.861L1761.29,948.448L1794.89,980.713L1794.67,986.703L1679.17,1045.72L1679.31,1039.28Z",
      "Whg. 103":
        "M1055.98,1086.93L1060.98,1085.03L1059.02,1051.6L1253.9,1099.83L1255.83,1158.21L1248.45,1161.59L1225.82,1155.56L1192.42,1170.54L1081.68,1140.24L1081.36,1134.49L1107.17,1123.95L1062.56,1112.06L1061.49,1093.75L1056.3,1092.41L1055.98,1086.93Z",
      "Whg. 102":
        "M1223.31,1173.09L1255.83,1158.21L1255.83,1158.21L1256.51,1157.89L1255.83,1158.21L1253.9,1099.83L1457.91,1150.32L1469.05,1153.08L1477.35,1136.43L1483.31,1133.42L1527.39,1144.04L1626.03,1092.41L1626.12,1086.45L1591.59,1078.88L1624.33,1062.38L1635.39,1068.09L1650.25,1060.49L1649.23,1113.45L1590.13,1145.66L1625.03,1153.94L1624.93,1159.8L1527.16,1215.15L1483.5,1203.77L1458.31,1217.5L1376.85,1195.79L1344.6,1212.19L1223.53,1179.06L1223.31,1173.09Z",
      "Whg. 101":
        "M1697.62,1087.08L1649.23,1113.45L1650.25,1060.49L1764.02,1002.36L1762.33,1051.81L1760.11,1053.03L1760.11,1053.03L1792.7,1059.64L1792.5,1064.94L1738.04,1095.77L1697.62,1087.08Z",
      "Whg. 3":
        "M1085.02,1199.51L1111.21,1187.98L1066.26,1175.12L1062.56,1112.06L1107.18,1123.95L1081.36,1134.49L1081.68,1140.24L1192.42,1170.54L1225.82,1155.56L1248.45,1161.59L1223.31,1173.09L1223.53,1179.06L1256.82,1188.17L1258.04,1224.79L1251.35,1228.08L1228.26,1221.48L1195.21,1237.44L1085.34,1205.15L1085.02,1199.51Z",
      "Whg. 2":
        "M1225.84,1240.64L1258.04,1224.78L1258.04,1224.79L1258.7,1224.45L1258.04,1224.78L1256.82,1188.17L1344.6,1212.19L1376.85,1195.79L1458.31,1217.5L1483.5,1203.77L1527.16,1215.15L1624.93,1159.8L1625.03,1153.94L1590.13,1145.66L1649.23,1113.45L1648,1176.6L1666.91,1165.39L1763.45,1184.04L1966.08,1239.34C1921.25,1280.95 1805.5,1307.24 1690.32,1325.14L1550.26,1299.05L1548.95,1291.08L1483.68,1272.8L1458.73,1287.41L1378.01,1264.32L1346.08,1281.78L1226.06,1246.51L1225.84,1240.64Z",
      "Whg. 1":
        "M1666.91,1165.39L1648,1176.6L1649.23,1113.45L1697.62,1087.08L1738.04,1095.77L1761.27,1082.62L1786.17,1068.52L1974.34,1104.52C2001.31,1135.32 2006.24,1168.24 1996.99,1202.53L1966.08,1239.34L1763.45,1184.04L1666.91,1165.39Z",
      "Whg. 9901":
        "M854.034,1251.87L1048.81,1190.95L1067.5,1196.42L1066.26,1175.12L1111.21,1187.98L1085.02,1199.51L1085.34,1205.15L1195.21,1237.44L1228.26,1221.48L1251.35,1228.08L1225.84,1240.64L1226.06,1246.51L1346.08,1281.78L1378.01,1264.32L1458.73,1287.41L1483.68,1272.8L1548.95,1291.08L1600.23,1259.29L1600.12,1267.88L1515.95,1320.5L1517.09,1332.58L1474.89,1374.57L1462.69,1398.33L1202.63,1356.16L1036.25,1318.48L828.122,1271.26L854.034,1251.87Z",
    },
    f1003: {
      "Whg. 2":
        "M1249.21,1202.51L1248.02,1166.82L1210.34,1166.68L1210.11,1160.88L1228.04,1110.65L1246.13,1110.71L1246.9,1133.46L1287.94,1133.6L1284.55,1145.81L1284.73,1152.04L1470.82,1152.69L1471.96,1134.22L1631.84,1134.76L1631.28,1198.1L1642.68,1361.09C1505.46,1362.66 1377.61,1338.83 1259.53,1288.54L1249.21,1202.51ZM1472.64,1197.53L1470.49,1227.13L1470.51,1233.32L1472.64,1197.53Z",
      "Whg. 9901":
        "M1250.8,1249.62L1134.91,1255.85L1121.1,1046.98L1237.57,1021.76L1227.69,1047.3L1225.77,1047.3L1219.37,1063.73L1207.54,1094.11L1207.77,1100.02L1232.59,1100.1L1245.78,1100.14L1245.9,1103.59L1246.13,1110.71L1228.04,1110.65L1227.14,1113.17L1225.32,1118.27L1210.11,1160.88L1210.34,1166.68L1248.14,1167.07L1248.26,1174.1L1249.21,1202.51L1249.65,1215.65L1249.84,1221.3L1250.8,1249.62ZM1249.21,1202.51L1290.03,1202.66L1283.99,1226.43L1284.16,1232.61L1470.51,1233.32L1472.55,1197.53L1509.97,1197.67L1509.56,1271.33L1251.49,1270.32L1249.21,1202.51Z",
      "Whg. 1":
        "M1631.28,1198.1L1630.86,1198.1L1631.84,1134.76L1713.68,1135.05L1717.77,1153.55L1851.13,1154.02L1851.42,1147.77L1846.81,1135.51L1867.12,1135.57L1867.97,1118.26L1868.98,1097.21L1901.67,1097.32L1901.98,1091.43L1952.23,1149.28L2017.9,1271.74C1921.39,1323.29 1794.52,1351.7 1642.68,1361.09L1631.28,1198.1Z",
      "Whg. 102":
        "M1207.54,1094.11L1225.77,1047.3L1227.69,1047.3L1222.67,1060.27L1222.93,1067.39L1244.05,1048.53L1244.54,1063.12L1285.77,1063.25L1282.49,1073.98L1282.68,1080.34L1470.54,1080.94L1471.69,1063.82L1528.48,1064L1533.48,1068.37L1632.77,1068.68L1631.84,1134.76L1471.96,1134.22L1470.8,1146.45L1470.82,1152.69L1284.73,1152.04L1284.55,1145.81L1287.93,1133.6L1287.94,1133.6L1246.9,1133.46L1245.78,1100.14L1245.79,1100.14L1207.77,1100.02L1207.54,1094.11Z",
      "Whg. 101":
        "M1891.79,1069.5L1901.98,1091.43L1901.67,1097.32L1868.98,1097.21L1867.12,1135.57L1846.8,1135.51L1851.42,1147.77L1851.13,1154.02L1717.77,1153.55L1713.68,1135.05L1631.84,1134.76L1632.77,1068.68L1632.77,1068.68L1870.33,1069.43L1891.79,1069.5Z",
      "Whg. 203":
        "M1391.69,854.664L1325.68,914.083L1326.36,911.926L1326.34,911.136L1292.3,919.001L1284.37,920.835L1275.85,922.802L1281.7,907.683L1283.95,905.647L1283.73,897.782L1274.32,899.964L1274.16,894.692L1283.51,871.756L1334.46,859.897L1405.33,795.709L1492.94,873.717L1413.06,873.528L1387.34,873.467L1391.69,854.664Z",
      "Whg. 202":
        "M1227.68,1047.3L1230.48,1040.09L1230.48,1040.1L1232.21,1035.63L1239.73,1016.16L1247.87,995.127L1247.87,995.127L1254.4,978.251L1260.91,961.42L1260.77,956.931L1250.36,959.325L1250.17,953.592L1261.35,926.154L1275.85,922.802L1284.37,920.835L1292.3,919.001L1326.34,911.136L1325.68,914.083L1391.69,854.664L1387.34,873.467L1413.06,873.528L1492.94,873.717L1540.98,873.831L1541.18,932.037L1622.81,932.249L1632.77,1068.68L1533.48,1068.37L1528.48,1064L1471.69,1063.82L1470.51,1074.58L1470.54,1080.94L1282.68,1080.34L1282.49,1073.98L1285.77,1063.25L1244.54,1063.12L1244.05,1048.53L1222.93,1067.39L1222.67,1060.27L1227.69,1047.3L1227.68,1047.3Z",
      "Whg. 201":
        "M1632.77,1068.68L1622.81,932.249L1620.99,874.021L1878.89,874.633L1894.18,1001.43L1905.56,1023.67L1905.24,1029.66L1897.58,1029.64L1901.53,1062.38L1901.15,1069.53L1870.33,1069.43L1632.77,1068.68Z",
    },
    f1004: {
      "Whg. 1":
        "M1620.18,1230.79L1598.31,1229.04L1601.17,1161.93L1701.32,1169.03L1692.54,1179.51L1692.21,1185.65L1827.41,1195.55L1838.31,1178.75L1862.05,1180.43L1878.61,1153.57L1907.45,1156.11L1932.08,1159.54L1939.77,1136.4L1984.35,1140.74L1993.53,1222.38L1941.28,1334.89C1925.04,1337.82 1907.15,1339.78 1907.15,1339.78L1725.62,1329.77C1725.62,1329.77 1725,1335.31 1724.14,1346.92C1697.34,1357.33 1559.62,1366.85 1547.12,1366.63L1620.18,1230.79Z",
      "Whg. 101":
        "M1701.31,1169.03L1601.17,1161.93L1603.93,1097.34L1867.15,1113.67L1890.44,1115.11L1907.48,1091.03L1916.67,1091.73L1906.66,1108.05L1906.65,1108.06L1906.66,1108.05L1947.08,1110.2L1946.58,1115.89L1932.08,1159.54L1878.61,1153.57L1862.05,1180.43L1838.31,1178.75L1827.41,1195.55L1692.21,1185.65L1692.54,1179.51L1701.31,1169.03Z",
      "Whg. 9901":
        "M1299.47,1192.3L1275.66,1211.32L1275.58,1216.93L1439.6,1234.16L1460.02,1211.32L1502.75,1219.36L1499.96,1282.59L1270.7,1261.08L1271.28,1217.17L1239.32,1209.57L1216.73,1235.06L1132.81,1232.38L1258.8,1093.44L1259.51,1187L1264.05,1186.89L1299.47,1192.3Z",
      "Whg. 2":
        "M1598.31,1229.04L1620.18,1230.79L1547.12,1366.63C1404.5,1357.57 1270.07,1322.59 1188.54,1266.87L1239.32,1209.57L1259.51,1189.01L1258.81,1135.07L1285.22,1136.76L1276.75,1143.47L1276.74,1149.29L1449.33,1165.73L1467.3,1150.31L1601.17,1161.93L1598.31,1229.04Z",
      "Whg. 102":
        "M1258.81,1135.07L1257.54,1065.84L1288.32,1067.54L1275.5,1075.73L1275.42,1084.44L1446.8,1099.22L1464.89,1085.07L1519.56,1088.45L1523.61,1092.35L1603.93,1097.34L1601.17,1161.93L1467.3,1150.31L1449.33,1165.73L1276.74,1149.29L1276.75,1143.47L1285.21,1136.76L1258.81,1135.07Z",
      "Whg. 203":
        "M1389.96,922.699L1422.82,904.402L1434.41,902.09L1401.92,920.34L1389.89,927.096L1389.96,922.699ZM1547.19,841.915L1621.43,914.556L1495.38,909.42L1468.12,883.949L1547.19,841.915Z",
      "Whg. 202":
        "M1230.58,1065.99L1231.28,1055.22L1320.49,979.278L1319.88,966.913L1315.82,967.171L1316.58,961.78L1343.49,946.998L1359.99,945.021L1366.73,939.381L1389.89,927.096L1468.12,883.949L1495.38,909.42L1587.19,913.161L1569.44,965.72L1662.47,971.766L1626.2,1091.43L1625.89,1098.35L1523.61,1092.35L1519.56,1088.45L1464.89,1085.07L1446.8,1099.22L1275.86,1084.48L1275.42,1084.44L1275.5,1075.73L1288.32,1067.54L1257.54,1065.84L1257.59,1050.05L1230.58,1065.99Z",
      "Whg. 201":
        "M1890.44,1115.11L1625.89,1098.35L1626.2,1091.43L1678.43,918.491L1923.69,934.45L1943.19,1018.9L1942.66,1025.12L1917.61,1023.96L1918.45,1053.01L1951.46,1056.32L1950.95,1062.11L1935.48,1092.65L1907.48,1091.03L1890.44,1115.11Z",
    },
    f1005: {
      "Whg. 203":
        "M1411.62,914.899L1621.34,884.734L1689.75,1019.95L1689.62,1025.71L1605.29,1041.17L1598.03,1036.62L1588.97,1030.95L1585.25,1029.29L1585.32,1022.54L1599.9,1023.97L1599.96,1018.71L1550.72,997.23L1502.25,992.18L1432.68,961.074L1411.62,914.899Z",
      "Whg. 201":
        "M1588.97,1030.95L1744.92,1128.66L1744.72,1135.24L1710.55,1119.28L1710.62,1116.3L1710.1,1136.33L1628.27,1153.8L1648.88,1164.36L1648.77,1170.38L1553.42,1191.25L1525.72,1175.7L1426.58,1196.87L1426.58,1196.08L1426.08,1196.56L1416.51,1205.88L1293.11,1128.54L1292.94,1122.02L1453.61,970.433L1502.25,992.18L1550.72,997.23L1599.96,1018.71L1599.9,1023.97L1585.32,1022.54L1585.25,1029.29L1588.97,1030.95Z",
      "Whg. 202":
        "M1145.88,1030.59L1193.9,946.215L1349.41,923.846L1411.62,914.899L1432.68,961.074L1416.17,953.692L1365.98,1000.64L1402.37,1018.77L1292.94,1122.02L1293.11,1128.54L1255.92,1105.24L1250.09,1090.81L1250.09,1090.81L1248,1085.65L1250.09,1090.81L1211.08,1097.82L1146.29,1056.1L1146.06,1050.83L1180.23,1045.15L1172.33,1040.27L1171.65,1023.73L1171.99,1032.22L1146.14,1036.44L1145.88,1030.59ZM1214.53,1002.91L1194.13,952.481L1201.97,971.876L1214.53,1002.91Z",
      "Whg. 103":
        "M1605.29,1041.17L1663.55,1030.49L1662.97,1059.39L1676.73,1065.51L1676.63,1070.42L1662.7,1073.13L1662.62,1077.1L1605.29,1041.17Z",
      "Whg. 102":
        "M1172.33,1040.27L1180.23,1045.14L1172.57,1046.42L1172.33,1040.27ZM1148.67,1110.54L1183.11,1104.34L1174.69,1098.74L1173.68,1073.73L1211.08,1097.82L1250.09,1090.81L1255.92,1105.24L1308.2,1138L1309.4,1188.33L1255.32,1152.36L1213.33,1160.51L1148.9,1115.73L1148.67,1110.54Z",
      "Whg. 101":
        "M1308.2,1138L1416.51,1205.88L1426.08,1196.56L1426.58,1196.87L1525.72,1175.7L1553.42,1191.25L1648.77,1170.38L1648.88,1164.36L1628.27,1153.8L1710.1,1136.33L1708.4,1201.81L1626.54,1220.69L1619.14,1216.6L1647.62,1232.39L1647.51,1238.3L1552.97,1260.67L1525.51,1244.01L1427.24,1266.68L1415.99,1259.2L1370.31,1269.63L1310.85,1228.3L1310.71,1222.44L1348.55,1214.36L1309.4,1188.33L1308.2,1138Z",
      "Whg. 2":
        "M1132.87,1161.95L1167.62,1152.27L1177.02,1156.37L1176.14,1134.67L1213.33,1160.51L1255.32,1152.36L1309.4,1188.33L1310.93,1251.87L1017.27,1319.24L964.593,1248.07L1000.6,1198.07L1132.87,1161.95Z",
      "Whg. 1":
        "M1017.27,1319.24L1210.27,1274.6L1310.93,1251.87L1309.4,1188.33L1348.55,1214.36L1310.71,1222.44L1310.85,1228.3L1370.31,1269.63L1415.99,1259.2L1427.24,1266.68L1525.51,1244.01L1552.97,1260.67L1647.51,1238.3L1647.62,1232.39L1626.54,1220.69L1708.4,1201.81L1706.73,1266.23L1630.77,1285.04L1666.79,1306.39L1666.67,1312.24L1560.28,1339.58L1529.09,1346.8L1453.21,1370.21L1370.66,1391.4L1216.53,1430.2L1050.39,1357.2L1017.27,1319.24Z",
      "Whg. 9901":
        "M1178.7,1212.85L1177.02,1156.37L1271.72,1223.9L1273.48,1284.79L1178.7,1212.85ZM1702.22,1081.91L1771.95,1090.21L1841.55,1106.19L1744.72,1135.24L1744.92,1128.66L1675.94,1085.44L1702.22,1081.91ZM1710.5,1120.87L1724.74,1128.98L1715.68,1140.48L1710.25,1141.01L1710.5,1120.87ZM1728.02,1131.32L1737.46,1136.74L1721.92,1139.65L1728.02,1131.32Z",
    },
    f1006: {
      "Whg. 101":
        "M1149.21,1137.42L1161.73,1133.72L1160,1094.34L1221.25,1116.95L1190.54,1126.05L1190.78,1132.1L1265.44,1160.52L1305.12,1147.89L1373.34,1173.07L1383.98,1186.91L1385.14,1186.51L1554.36,1128.27L1554,1186.76L1386.11,1248.79L1306.9,1217.29L1267.61,1230.87L1193.53,1200.49L1193.29,1194.53L1232.49,1181.9L1224.45,1184.49L1162.88,1160.01L1162.36,1148.1L1149.46,1143.04L1149.21,1137.42Z",
      "Whg. 201":
        "M1159.41,1080.82L1125.03,1090.32L1124.72,1083.74L1242.72,996.121L1435.53,947.43L1490.26,1014.08L1484.17,1015.84L1484.17,1017.06L1491.53,1026.03L1508.74,1036.59L1573.17,1115.06L1573.1,1121.82L1383.98,1186.91L1373.35,1173.07L1305.12,1147.89L1265.44,1160.52L1190.78,1132.1L1190.54,1126.05L1221.24,1116.94L1160,1094.34L1159.41,1080.82Z",
      "Whg. 9901":
        "M1620.66,1288.75L1604.96,1295.44L1605.78,1231.9L1621.6,1225.61L1758.72,1274.23L1828.63,1299.02L1904.21,1263.11L1919.19,1256.01L1919.49,1250.28L1905.12,1245.57L1857.6,1230.01L1907.07,1207.88L1906.57,1217.43L1910.95,1215.47L2049.16,1259.26L2048.78,1264.61L1947.13,1316.84L1884.53,1295.14L1884.8,1289.62L1916.96,1274.07L1903.88,1269.68L1756.57,1340.12L1620.66,1288.75Z",
      "Whg. 203":
        "M1617.07,1035.36L1551.41,996.561L1544.05,998.671L1537.2,990.478L1587.6,976.255L1596.37,986.57L1605.05,984.073L1643.67,922.585L1867.75,976.502L1943.57,1072.96L1943.22,1079.35L1914.1,1071.54L1913.6,1081.25L1899.76,1086.56L1931.85,1095.38L1931.53,1101.16L1830.04,1141.51L1788.81,1129.12L1780.61,1132.27L1772.87,1145.55L1631.02,1101.89L1626.11,1103.58L1626.21,1096.96L1607.8,1074.94L1608.12,1050.22L1619.7,1046.55L1624.03,1045.18L1624.11,1039.52L1617.07,1035.36Z",
      "Whg. 202":
        "M1489.77,933.731L1413.8,952.914L1462.87,879.081L1587.46,909.059L1643.67,922.585L1605.05,984.073L1596.37,986.57L1587.6,976.255L1537.2,990.478L1489.77,933.731Z",
      "Whg. 103":
        "M1622.57,1161.42L1606.61,1167.32L1607.35,1110.04L1623.41,1104.51L1631.02,1101.89L1763.05,1142.52L1772.87,1145.55L1780.6,1132.27L1788.81,1129.12L1830.04,1141.51L1912.18,1108.86L1910.31,1145.07L1895.82,1151.1L1888.1,1148.81L1928.31,1160.75L1928,1166.43L1827.21,1209.83L1786.38,1196.6L1760.92,1207.18L1622.57,1161.42ZM1899.76,1086.56L1913.6,1081.25L1913.14,1090.24L1899.76,1086.56Z",
      "Whg. 3":
        "M1758.72,1274.23L1621.6,1225.61L1605.78,1231.9L1606.61,1167.32L1622.57,1161.42L1760.92,1207.18L1786.38,1196.6L1827.21,1209.83L1908.78,1174.71L1907.07,1207.88L1857.6,1230L1919.49,1250.28L1919.19,1256.01L1828.63,1299.02L1758.72,1274.23Z",
      "Whg. 1":
        "M1157.83,1134.62L1148.28,1137.57L1149.09,1142.77L1159.97,1147.66L1160.07,1158.67L1224.45,1184.49L1193.29,1194.53L1193.53,1200.49L1267.61,1230.87L1306.9,1217.29L1386.11,1248.79L1554,1186.76L1553.6,1252.68L1387.19,1318.92L1313.55,1287.55L1254.71,1309.56L1171.83,1272.59L1045.99,1230.91L975.882,1193.35C976.141,1163.73 1005.46,1137.3 1074.93,1115.27L1111.46,1103.33L1157.95,1125.23L1157.83,1134.62Z",
      "Whg. 2":
        "M1111.46,1103.33L1157.95,1125.23L1158.32,1087.18L1111.46,1103.33",
    },
    f1007: {
      "Whg. 103":
        "M1609.37,1153.28L1585.62,1154.53L1586.27,1092.86L1598.4,1092.26L1609.94,1110.55L1635.59,1151.17L1645.57,1141.98L1647.9,1145.56L1690.17,1143.33L1702.57,1160.92L1882.98,1151.19L1883.28,1144.95L1872.67,1133.71L1907.96,1131.85L1907.33,1144.29L1928.25,1165.75L1927.94,1171.58L1905.9,1172.8L1906.19,1166.97L1906.19,1166.97L1905.9,1172.8L1904.49,1200.85L1868.98,1202.88L1879.94,1215.56L1879.64,1221.7L1700.79,1232.18L1688.53,1213.23L1646.63,1215.63L1609.37,1153.28ZM1924.75,1231.63L1924.45,1237.35L1902.58,1238.67L1902.87,1232.93L1904.1,1208.64L1924.75,1231.63Z",
      "Whg. 9901":
        "M1607.65,1281.24L1584.29,1282.67L1584.95,1219.12L1608.5,1217.77L1645.38,1284.49L1664.87,1319.76L1824.7,1309.5L1824.94,1303.36L1804.06,1274.68L1901.07,1268.68L1897.71,1335.38L1644.15,1352.17L1607.65,1281.24ZM1897.71,1335.38L1898.01,1329.57L1902.58,1238.67L1924.45,1237.35L1924.75,1231.63L1904.1,1208.64L1905.9,1172.8L1927.94,1171.58L2186.38,1368.16L2056.88,1370.57L1858.98,1384.29L1835.14,1350.45L1835.4,1344.57L1901.45,1340.18L1897.71,1335.38Z",
      "Whg. 203":
        "M1900.97,1064.25L1899.42,1095.74L1899.49,1094.49L1934.34,1128.37L1933.96,1135.34L1908.9,1113.02L1907.96,1131.85L1872.67,1133.71L1883.28,1144.95L1882.98,1151.19L1702.57,1160.92L1690.17,1143.33L1647.9,1145.56L1645.57,1141.98L1635.59,1151.17L1598.4,1092.26L1591.03,1092.62L1591.1,1085.99L1586.6,1062.23L1586.88,1035.48L1598.95,1034.93L1599.02,1029.26L1580.78,980.568L1571.18,980.969L1569.58,972.521L1642.36,969.523L1644.74,980.575L1657.6,980.037L1715.79,926.063L1778.04,981.687L1780.25,983.852L1787,989.88L1787.27,989.934L1818.93,1018.23L1815.51,1017.56L1880.34,1030.21L1913.87,1060.78L1913.57,1066.67L1900.97,1064.25Z",
      "Whg. 202":
        "M1657.6,980.037L1644.74,980.575L1642.36,969.523L1569.58,972.521L1558.37,913.465L1614.86,911.358L1659.16,870.054L1758.34,958.771L1814.22,969.922L1842.04,995.286L1841.81,1000.69L1830.59,998.476L1829.71,1020.34L1818.98,1018.24L1818.93,1018.23L1787.27,989.934L1787,989.88L1780.25,983.852L1780.27,983.077L1754.7,958.044L1754.68,958.792L1778.04,981.687L1715.79,926.063L1657.6,980.037Z",
      "Whg. 201":
        "M1221.54,1037.15L1251.34,1035.82L1248.9,1003.81L1238.75,1004.24L1238.56,998.321L1243.2,925.224L1484.82,916.21L1495.9,984.11L1486.62,984.498L1486.62,985.686L1488.1,994.93L1501.42,1039.36L1504.88,1039.2L1513.13,1089.78L1513.12,1096.45L1256.92,1109.02L1254.08,1071.74L1225.98,1073.05L1225.79,1067.35L1221.54,1037.15Z",
      "Whg. 101":
        "M1223.66,1099.19L1256.06,1097.63L1256.92,1109.02L1271.44,1108.31L1280.77,1107.85L1509.21,1096.64L1509.14,1158.6L1282.48,1170.63L1275.66,1135.02L1228.16,1137.43L1223.85,1104.59L1223.66,1099.19Z",
      "Whg. 3":
        "M1569.72,1218.69L1584.95,1219.12L1585.62,1154.53L1609.37,1153.28L1646.63,1215.63L1688.53,1213.23L1700.79,1232.18L1879.64,1221.7L1879.94,1215.56L1868.98,1202.88L1904.49,1200.85L1901.07,1268.68L1804.05,1274.68L1824.94,1303.36L1824.7,1309.5L1878.79,1380.72L1658.67,1397.68L1569.72,1218.69Z",
      "Whg. 1":
        "M1222.83,1061.93L1225.98,1073.05L1254.08,1071.74L1256.01,1097.07L1223.22,1099.39L1228,1137.29L1275.66,1135.02L1282.48,1170.63L1509.14,1158.6L1510.95,1233.93L1286.14,1246.81L1215.6,1251.99L1167.37,1163.04L1164.94,1100.47C1172.23,1078.18 1190.45,1064.49 1222.83,1061.93Z",
    },
    f1008: {
      "Whg. 203":
        "M1360.26,1077.27L1360.15,1070.81L1460.82,972.087L1548.4,947.738L1549.59,946.207L1549.6,945.094L1543.68,943.729L1549.41,936.38L1571.34,941.36L1648.91,919.794L1698.29,988.39L1693.61,989.877L1693.59,990.655L1699.12,998.345L1709.42,1003.84L1754.76,1066.85L1754.56,1073.28L1571.29,1140.86L1564.97,1131.6L1543.22,1125.1L1508.73,1137.42L1382.48,1098.63L1382.39,1092.8L1407.82,1084.67L1389.17,1079.11L1389.03,1068.36L1360.26,1077.27Z",
      "Whg. 202":
        "M1693.61,989.877L1698.29,988.389L1648.91,919.795L1571.34,941.361L1549.41,936.38L1589.51,885.012L1695.75,906.774L1799.05,878.057L1900.59,1013.53L1900.3,1019.54L1754.56,1073.28L1754.76,1066.85L1709.42,1003.84L1699.12,998.345L1693.59,990.655L1693.61,989.877Z",
      "Whg. 201":
        "M1268.73,977.222L1382.29,842.563L1537.35,874.326L1491.64,931.737L1484.53,930.101L1423.35,966.949L1423.4,972.116L1437.63,975.709L1437.78,994.687L1415.12,1016.9L1410.33,1021.6L1268.89,982.938L1268.73,977.222Z",
      "Whg. 103":
        "M1383.35,1158.85L1409.37,1149.82L1390.06,1143.57L1389.47,1100.79L1508.73,1137.42L1543.22,1125.1L1564.97,1131.6L1571.29,1140.86L1574.73,1139.59L1741.04,1078.27L1739.28,1137.58L1724.66,1143.39L1754.83,1152.02L1754.65,1157.71L1662.96,1195.37L1624.23,1183.33L1574.15,1203.24L1542.86,1193.1L1508.66,1206.36L1383.43,1164.6L1383.35,1158.85ZM1407.82,1084.67L1389.34,1090.58L1389.17,1079.11L1407.82,1084.67Z",
      "Whg. 102":
        "M1739.8,1137.37L1739.28,1137.58L1741.04,1078.27L1874.44,1029.08L1871.9,1084.84L1830.7,1101.22L1860.35,1108.97L1860.11,1114.41L1777.96,1148.14L1739.8,1137.37Z",
      "Whg. 3":
        "M1390.49,1169.8L1390.38,1166.91L1508.66,1206.36L1542.86,1193.1L1574.15,1203.24L1624.23,1183.33L1662.96,1195.37L1738.49,1164.36L1737.42,1200.6L1722.25,1207.1L1722.25,1207.1L1752.8,1216.53L1752.62,1222.14L1661.6,1262.38L1623.21,1249.51L1573.53,1270.79L1497.3,1244.16L1438.68,1267.74L1428.26,1263.92L1327.83,1308.62L1174.99,1258.14L1390.49,1169.8ZM1409.37,1149.82L1390.23,1156.46L1390.06,1143.57L1409.37,1149.82ZM1739.28,1137.58L1738.99,1147.49L1724.66,1143.39L1739.28,1137.58Z",
      "Whg. 2":
        "M1737.93,1200.38L1737.42,1200.6L1738.49,1164.36L1754.65,1157.71L1754.83,1152.02L1738.99,1147.49L1739.28,1137.58L1739.8,1137.37L1777.96,1148.14L1860.11,1114.41L1860.35,1108.97L1830.7,1101.22L1871.9,1084.84L1872.62,1044.28C1884.2,1044.47 1894.54,1047.13 1903.58,1052.38L1939.76,1074.68L1943.21,1090.99L1901.27,1120.05L1869.73,1132.36L1869.19,1144.16L1827.59,1161.98L1857.63,1170.46L1857.38,1175.81L1775.77,1211.9L1737.93,1200.38Z",
      "Whg. 1":
        "M1242.98,1091.34L1246.3,1080.92L1300.61,1056.02L1298.84,991.123L1410.33,1021.6L1368,1063.11L1360.15,1070.81L1360.26,1077.27L1387.47,1068.84L1389.04,1069.3L1389.17,1079.11L1389.34,1090.58L1382.39,1092.8L1382.48,1098.63L1389.47,1100.79L1389.97,1137.23L1301.29,1107.99L1242.98,1091.34Z",
      "Whg. 9901":
        "M1401.88,1274.12L1391.78,1269.45L1391.52,1250.44L1438.68,1267.74L1497.3,1244.16L1573.53,1270.79L1623.21,1249.51L1661.6,1262.38L1752.62,1222.14L1752.8,1216.53L1722.25,1207.1L1737.93,1200.38L1775.77,1211.9L1857.38,1175.81L1857.63,1170.46L1827.58,1161.99L1869.19,1144.16L1867.88,1172.71L1907.23,1152.96L1993.89,1170.65L1930.09,1227.83L1888.57,1265.88L1853.54,1300.11L1817.73,1336.14L1754.13,1395.82L1675.01,1447.19L1463,1362.89L1327.83,1308.62L1401.88,1274.12Z",
    },
  },
};

export const StateContext = React.createContext();

const ProjectData = ({ children }) => {
  const [state, setState] = useState(initialState);

  const getData = () => {
    fetch(appSetup.dataPath, {
      headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
      },
    })
      .then(function (response) {
        if (response.status !== 200) {
          setState((prevState) => ({
            ...prevState,
            stateIsLoading: "error",
          }));
          throw new Error("External data not found");
        } else {
          return response.json();
        }
      })
      .then(function (data) {
        let apiFilteredResults, apiResults;
        if (appSetup.apiMode === "flatfox") {
          apiFilteredResults = data.results.filter((flatfoxData) => {
            if (
              flatfoxData.object_category === "APARTMENT" &&
              flatfoxData.object_type !== "HOBBY_ROOM"
            ) {
              return true;
            } else {
              return false;
            }
          });
          apiResults = apiFilteredResults.map((flatfoxData) => {
            return appSetup.convertFlatfoxAPIToEmonitor(flatfoxData);
          });
        } else {
          apiResults = data;
        }
        if (Array.isArray(apiResults)) {
          setState((prevState) => ({
            ...prevState,
            units: apiResults,
            stateIsLoading: false,
          }));
        } else {
          setState((prevState) => ({
            ...prevState,
            stateIsLoading: "error",
          }));
          throw new Error("External data is not an array");
        }
        // console.log(apiResults);
      })
      .catch((error) => {
        console.warn(error.message);
      });
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <StateContext.Provider value={[state, setState]}>
      {children}
    </StateContext.Provider>
  );
};

export default ProjectData;
