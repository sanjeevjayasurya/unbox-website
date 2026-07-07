import axios from "axios";

import {
  fetchCountryCallingCodeApiEndPoint,
  ipInfoApiEndPoint,
} from "../helpers/config";

export const FETCH_LOCATION_REQUEST = "FETCH_LOCATION_REQUEST";
export const FETCH_LOCATION_SUCCESS = "FETCH_LOCATION_SUCCESS";
export const FETCH_LOCATION_FAILURE = "FETCH_LOCATION_FAILURE";

export const fetchLocationInfo = (ipInfoToken) => {
  return async (dispatch) => {
    dispatch({ type: FETCH_LOCATION_REQUEST });

    try {
      const ipRes = await axios.get(
        `${ipInfoApiEndPoint}?token=${ipInfoToken}`
      );
      const ipData = ipRes.data;

      const countryRes = await axios.get(
        `${fetchCountryCallingCodeApiEndPoint}/${ipData.country}`
      );
      const countryData = countryRes.data;

      const callingCode =
        countryData[0]?.idd?.root + (countryData[0]?.idd?.suffixes?.[0] || "");
      const countryName = countryData[0]?.name?.common;

      const payload = {
        ip: ipData.ip,
        country: ipData.country,
        countryCode: ipData.country,
        region: ipData.region,
        city: ipData.city,
        callingCode,
        countryName,
      };

      dispatch({
        type: FETCH_LOCATION_SUCCESS,
        payload,
      });
      return {
        ...payload,
        country_code: ipData.country,
        region_code: ipData.region,
      };
    } catch (error) {
      console.error("Error fetching location:", error);
      dispatch({ type: FETCH_LOCATION_FAILURE, error: error.message });
    }
  };
};
