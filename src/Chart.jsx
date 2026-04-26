import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  ResponsiveContainer
} from "recharts";
import { displayMonth } from "./displayMonth";


const Chart = ({data}) => {

  //month - dtp quantity array
  const dtpForMonth = new Array(12).fill(0)
  //fill dtp-month array
  data.forEach(dtp => {
    const [d, m, y] = dtp.date.split('.').map(Number);
    if(m >= 0 && m <= 12){
      dtpForMonth[m-1] = dtpForMonth[m-1] + 1 
    }
  })

  const chartData = dtpForMonth.map((dtp, index) => ({
    name: displayMonth(String(index)).slice(0,3),
    value: dtp
  }))

return <ResponsiveContainer width="100%" height="100%">
          <LineChart data={chartData}>
                <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
        </ResponsiveContainer>

}

export default Chart