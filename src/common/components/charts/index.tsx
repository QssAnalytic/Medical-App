import { hospitals } from "@/common/static";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts";

const data = [
    {
        name: "2017",
        "Baku City Hospital": '0', 
        "Ege Hospital": '0',
        "Liv Bonadea Hospital": '0',
        "Avrasiya Hospital": '0',
        "Baku Health Center": '0',
        "Baku Medical Plaza": '0',
        "Stimul Hospital": '0',
        "Uniklinika": '0',
        "New Med Hospital": '0',
        "Istanbul NS Hospital": "0"
    },
    {
        name: "2018",
        "Baku City Hospital": '7',
        "Ege Hospital": '9',
        "Liv Bonadea Hospital": '3',
        "Avrasiya Hospital": '5',
        "Baku Health Center": '11',
        "Baku Medical Plaza": '4',
        "Stimul Hospital": '6',
        "Uniklinika": '30',
        "New Med Hospital": '10',
        "Istanbul NS Hospital": "13"
    },
    {
        name: "2019",
        "Baku City Hospital": '14',
        "Ege Hospital": '19',
        "Liv Bonadea Hospital": '13',
        "Avrasiya Hospital": '15',
        "Baku Health Center": '21',
        "Baku Medical Plaza": '2',
        "Stimul Hospital": '16',
        "Uniklinika": '18',
        "New Med Hospital": '20',
        "Istanbul NS Hospital": '14'
    },
    {
        name: "2020",
        "Baku City Hospital": '39',
        "Ege Hospital": '11',
        "Liv Bonadea Hospital": '24',
        "Avrasiya Hospital": '29',
        "Baku Health Center": '50',
        "Baku Medical Plaza": '27',
        "Stimul Hospital": '31',
        "Uniklinika": '34',
        "New Med Hospital": '33',
        "Istanbul NS Hospital": '26'
    },
    {
        name: "2021",
        "Baku City Hospital": '48',
        "Ege Hospital": '32',
        "Liv Bonadea Hospital": '34',
        "Avrasiya Hospital": '39',
        "Baku Health Center": '27',
        "Baku Medical Plaza": '46',
        "Stimul Hospital": '10',
        "Uniklinika": '54',
        "New Med Hospital": '42',
        "Istanbul NS Hospital": '39'
    },
    {
        name: "2022",
        "Baku City Hospital": '64',
        "Ege Hospital": '59',
        "Liv Bonadea Hospital": '55',
        "Avrasiya Hospital": '59',
        "Baku Health Center": '53',
        "Baku Medical Plaza": '60',
        "Stimul Hospital": '52',
        "Uniklinika": '69',
        "New Med Hospital": '62',
        "Istanbul NS Hospital": '57'
    },
    {
        name: "2023",
        "Baku City Hospital": '73',
        "Ege Hospital": '71',
        "Liv Bonadea Hospital": '78',
        "Avrasiya Hospital": '77',
        "Baku Health Center": '65',
        "Baku Medical Plaza": '60',
        "Stimul Hospital": '71',
        "Uniklinika": '80',
        "New Med Hospital": '62',
        "Istanbul NS Hospital": '57'
    }
];

export default function Chart() {
    return (
        <div className="border rounded-lg ">
            <LineChart
            width={430}
            height={306}
            data={data}
            margin={{
                top: 15,
                right: 30,
                left: 0,
                bottom: 0
              }}
              
        >
            <CartesianGrid strokeLinecap="square" vertical={false}/>
            <XAxis 
            dataKey="name" 
            tickCount={10} 
            axisLine={{ stroke: '#d8d8d8' }} 
            tickLine={false}

            />
            <YAxis 
            dataKey="count" 
            tickCount={10} ticks={[10, 20, 30, 40, 50, 60, 70, 80]}
            axisLine={{ stroke: '#d8d8d8' }} 
            tickLine={false}
             />
            <Tooltip />
                {hospitals.map(hospital => (
                    <Line key={hospital.data}    dataKey={hospital.data} stroke={`#${Math.floor(Math.random()*16777215).toString(16)}`}  />
                ))}
     
        </LineChart>
        </div>
    );
}
