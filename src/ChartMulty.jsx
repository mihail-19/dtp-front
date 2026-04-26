import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer,
  Legend
} from "recharts";
import { displayMonth } from "./displayMonth";


const ChartMulty = ({data}) => {

  //month - dtp quantity array
  const dtpForMonth = new Array(12).fill(0)
  const dtpObArr = dtpForMonth.map((dtp, index) => ({
     name: displayMonth(String(index)).slice(0,3),
     fatal: 0,
     trauma: 0,
    noDamage: 0,
    total: 0

  }))
  //fill dtp-month array
  data.forEach(dtp => {
    const [d, m, y] = dtp.date.split('.').map(Number);
    if(m >= 0 && m <= 12){
       dtpObArr[m-1].total =  dtpObArr[m-1].total + 1
      if(dtp.died > 0) {
        dtpObArr[m-1].fatal = dtpObArr[m-1].fatal + 1;
      } else if (dtp.traumatized > 0){
        dtpObArr[m-1].trauma = dtpObArr[m-1].trauma + 1;
      } else if (dtp.hasNoDamage > 0){
        dtpObArr[m-1].noDamage = dtpObArr[m-1].noDamage + 1;
      }
    }
  })


return <ResponsiveContainer width="100%" height="100%">
          <LineChart data={dtpObArr}>
                <CartesianGrid strokeDasharray="3 3" />
                 <Legend />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
               <Line type="monotone" dataKey="fatal" name="із загиблими" stroke="#8884d8" />
              <Line type="monotone" dataKey="trauma" name="із постраждалими" stroke="#82ca9d" />
              <Line type="monotone" dataKey="noDamage" name="без постраждалих" stroke="#ff7300" />
              <Line type="monotone" dataKey="total" name="всього" stroke="#311a07"  strokeWidth={2} />
            </LineChart>
        </ResponsiveContainer>

}

export default ChartMulty