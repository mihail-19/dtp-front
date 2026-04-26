import Papa from 'papaparse'

export const loadTrafficLights = async () =>{
     const url = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTqZ6R7a3Ah3pd0D-bGVp3a65UNaB_PWU55cilChmyxxasckMBGrNo5pz2jvL8qey0jcS2WrslEILv8/pub?gid=0&single=true&output=csv'
      
    const res = await fetch(url)
      const text = await res.text()

      const parsed = Papa.parse(text, {
        header: true,
        skipEmptyLines: true,
      })

      const textToDigit = (txt) => {
        const val = Number(String(txt).replace(/\u00A0/g, ""))

        return val != undefined ? val : 0 
      }

      const rows = parsed.data
        .map(row => ({
            lat: parseFloat(row.lat),
            lng: parseFloat(row.lng),
            number: Number(row.number),
            name: row.name,
            district: row.district,
           
        }))
        .filter(p => !isNaN(p.lat) && !isNaN(p.lng))

      

      return rows
    
}
  