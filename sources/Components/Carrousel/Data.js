import { Image } from "react-native";

const imagen1 = require("../../Images/Banners/imagen01.png");
const imagen2 = require("../../Images/Banners/imagen02.png");
const imagen3 = require("../../Images/Banners/imagen03.png");
const imagen4 = require("../../Images/Banners/imagen04.png");
const imagen5 = require("../../Images/Banners/imagen05.png");
const imagen6 = require("../../Images/Banners/imagen06.png");
const imagen7 = require("../../Images/Banners/imagen07.png");
const imagen8 = require("../../Images/Banners/imagen08.png");

export const imagenes = [
  Image.resolveAssetSource ? Image.resolveAssetSource(imagen1)?.uri : imagen1,
  Image.resolveAssetSource ? Image.resolveAssetSource(imagen2)?.uri : imagen2,
  Image.resolveAssetSource ? Image.resolveAssetSource(imagen3)?.uri : imagen3,
  Image.resolveAssetSource ? Image.resolveAssetSource(imagen4)?.uri : imagen4,
  Image.resolveAssetSource ? Image.resolveAssetSource(imagen5)?.uri : imagen5,
  Image.resolveAssetSource ? Image.resolveAssetSource(imagen6)?.uri : imagen6,
  Image.resolveAssetSource ? Image.resolveAssetSource(imagen7)?.uri : imagen7,
  Image.resolveAssetSource ? Image.resolveAssetSource(imagen8)?.uri : imagen8,
];
