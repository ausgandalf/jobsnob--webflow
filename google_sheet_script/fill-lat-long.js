const API_KEY = 'API-KEY-HERE';

function geocodeCityStateOnly() {
  const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
  const data = sheet.getDataRange().getValues();

  const header = data[0];
  const cityIdx = header.indexOf("City");
  const stateIdx = header.indexOf("State");
  const latIdx = header.indexOf("Latitude");
  const lngIdx = header.indexOf("Longitude");

  for (let i = 1; i < data.length; i++) {
    const row = data[i];

    if (row[latIdx] && row[lngIdx]) continue; // Skip if already filled

    const city = row[cityIdx];
    const state = row[stateIdx];
    if (!city || !state) continue;

    const address = encodeURIComponent(`${city}, ${state}`);
    const url = `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=${API_KEY}`;

    try {
      const response = UrlFetchApp.fetch(url);
      const json = JSON.parse(response.getContentText());

      if (json.status === 'OK') {
        const location = json.results[0].geometry.location;
        sheet.getRange(i + 1, latIdx + 1).setValue(location.lat);
        sheet.getRange(i + 1, lngIdx + 1).setValue(location.lng);
        Logger.log(`Row ${i + 1}: ${city}, ${state} : ${location.lat}, ${location.lng}`);
        Utilities.sleep(150); // avoid hitting rate limit
      } else {
        Logger.log(`Row ${i + 1}: Geocoding failed: ${json.status}`);
      }
    } catch (e) {
      Logger.log(`Row ${i + 1}: Error fetching geocode: ${e}`);
    }
  }
}
