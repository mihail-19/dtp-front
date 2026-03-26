import { useEffect } from "react"
import Papa from 'papaparse'

export const loadPoints = async (year) =>{
     const urls = {
        2016: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSPtLkSBLD6KtxU4ZGdG1a_b2yoUDzfoAb9aJu6nwWWwtIgnGiVtTj3XOFWrl5JoFrlWa4aUGexLmGr/pub?gid=0&single=true&output=csv',
        2017: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRwiZdN9m1yQx4Kdxy92cgJLFitEKs5nsJXttkRevokkt1SOLU4sJMwuP_uGdGCwUeGQ_V3UADA0Iru/pub?gid=0&single=true&output=csv',
        2018: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRK5p5CtwLh2Ntm7ZVKY6p5WPr63DSAjXFMS2KoEobLEIlxAHznazpU9DOeFYMgPsp930nxqtHTVhak/pub?gid=0&single=true&output=csv',
        2019: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vTwGiYFBUE274iJgCYJuB9v0VPfnga-X4-Is4MqS4x0C-NfzzwJ2qK_4CxRKnmtFNNsM1MH6uoHE30p/pub?gid=0&single=true&output=csv',
        2020: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQ_LK58KuMka5dLF8uULivrhqmeqI51-RRFnw7jTC5OJq0GShAdctenQKqzpy7lT767N9uHSBpsiO2B/pub?gid=0&single=true&output=csv',
        2021: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR4UzoBSyDwYoCmFCjBRuITAmyXj9yg5KPr9A_sV_RuSq9-El8si8aqlGXU38mfb7jtjzhkNBMH0brB/pub?gid=0&single=true&output=csv',
        2022: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vQl9u31_wHjx3plnq0ad41LkK66AIwZy_9cHZxgqPd07oAyPre3mhyGnBnChOuY_KNMjM-kNRlM_9Ft/pub?gid=0&single=true&output=csv',
        2023: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vR6KTUDgRW_P_yeA4Gi161fRv5sV-a5BEi2MO30jkUW3O_Nx7bz3TCVdpX53v_fJajbOc0V7_Sukzr6/pub?gid=0&single=true&output=csv',
        2024: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT73nm9BtO19kCp8bXge7qBycU-MNY3gsyhVwK6RiqFML8f1PVpdunDpDlvMsaWVl97W0UK7KtQ3c0P/pub?gid=0&single=true&output=csv',
        2025: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vT8cFcRUYFgVq3-EBYJ0k9h5lvO8EJRMDTy73_If9YfW1J3mqeFhE0pexCHmG2waVZckpWtm73Gu3L5/pub?gid=0&single=true&output=csv',
        2026: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vRce2IuwJ1KA0jL5ck3Ed-k4ARplb-VkCJYWbLLKRUEeGnsIevJ-6IY1az8FwuG0Qqc6utryg1-s8o9/pub?gid=0&single=true&output=csv'
    };

    const url = urls[year]

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
            value: Number(40),
            hasNoDamage: textToDigit(row.hasNoDamage),
            died: textToDigit(row.died),
            traumatized: textToDigit(row.traumatized),
            address: row.address,
            date: row.date,
            time: row.time,
            day: row.day,
            type: row.type,
            circumstance: row.circumstance,
            violation: row.violation
        }))
        .filter(p => !isNaN(p.lat) && !isNaN(p.lng))

      

      return rows
    
}
  