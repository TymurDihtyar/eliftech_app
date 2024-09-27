import axios from "axios";
import {baseURL} from "../constants/urls.ts";

const apiService = axios.create({baseURL})

export {apiService}