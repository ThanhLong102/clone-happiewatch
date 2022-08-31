import * as React from 'react';
import {useEffect, useState} from 'react';
import {
    ArcElement,
    CategoryScale,
    Chart as ChartJS,
    Legend,
    LinearScale,
    LineElement,
    PointElement,
    Title,
    Tooltip,
} from 'chart.js';
import {Line} from 'react-chartjs-2';
import {TextField} from "@mui/material";
import {DesktopDatePicker} from "@mui/x-date-pickers";
import {LocalizationProvider} from '@mui/x-date-pickers/LocalizationProvider';
import {AdapterDayjs} from '@mui/x-date-pickers/AdapterDayjs';
import axios from "axios";
import "./Statisitic.css";
import { Pie } from 'react-chartjs-2';


ChartJS.register(
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend
);

ChartJS.register(ArcElement, Tooltip, Legend);


export default function Statistical() {
    const [dateForm, setDateForm] = useState('2000-01-01T14:00:00');
    const [dateEnd, setDateEnd] = useState('2022-01-01T14:00:00');
    const [dateCostSuccess, setDataCostSuccess] = useState([]);
    const [dateCostFall, setDataCostFall] = useState([]);
    const [dataTotal, setDataTotal] = useState([]);


    const handleChangeForm = (newValue) => {
        setDateForm(newValue);
    };
    const handleChangeEnd = (newValue) => {
        setDateEnd(newValue);
    };

    const labels = ['January', 'February', 'March', 'April', 'May', 'June', 'July','August','September','October','November','December'];

    const data = {
        labels,
        datasets: [
            {
                label: 'Tổng tiền từng tháng đã nhận',
                data: dateCostSuccess,
                borderColor: 'rgb(255, 99, 132)',
                backgroundColor: 'rgba(255, 99, 132, 0.5)',
            },
            {
                label: 'Tổng tiền từng tháng thất thoát',
                data: dateCostFall,
                borderColor: 'rgb(53, 162, 235)',
                backgroundColor: 'rgba(53, 162, 235, 0.5)',
            },
        ],
    };
    const dataTotalChart = {
        labels: ['Tổng đơn hàng thành công', 'Tổng đơn hàng đã hủy'],
        datasets: [
            {
                label: '# of Votes',
                data: dataTotal,
                backgroundColor: [
                    'rgba(255, 99, 132, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                ],
                borderColor: [
                    'rgba(255, 99, 132, 1)',
                    'rgba(54, 162, 235, 1)',
                ],
                borderWidth: 1,
            },
        ],
    };

    const formatDate = (date) => {
        return new Date(date);
    }

    useEffect(() => {
        let data = {
            "startDate": formatDate(dateForm),
            "endDate": formatDate(dateEnd)
        };

        const config = {
            method: 'post',
            url: 'http://localhost:8080/api/oder/find-By-Date-Success',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setDataCostSuccess(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [dateForm, dateEnd]);

    useEffect(() => {
        let data = {
            "startDate": formatDate(dateForm),
            "endDate": formatDate(dateEnd)
        };

        const config = {
            method: 'post',
            url: 'http://localhost:8080/api/oder/find-By-Date-Fall',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setDataCostFall(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [dateForm, dateEnd]);


    useEffect(() => {
        let data = {
            "startDate": formatDate(dateForm),
            "endDate": formatDate(dateEnd)
        };

        const config = {
            method: 'post',
            url: 'http://localhost:8080/api/oder/find-By-Total-Order',
            headers: {
                'Content-Type': 'application/json'
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                setDataTotal(response.data);
            })
            .catch(function (error) {
                console.log(error);
            })
    }, [dateForm, dateEnd]);


    return (
        <div className="order">
            <h2>Thống kê</h2>
            <div className="date-form">
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <div className="date-form-wrapper">
                        <div className="date-form-wrapper-form">
                            <label>Từ ngày:</label>
                            <DesktopDatePicker
                                label="Từ ngày"
                                inputFormat="DD/MM/YYYY"
                                value={dateForm}
                                onChange={handleChangeForm}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                        <div className="date-form-wrapper-end">
                            <label>Đến ngày:</label>
                            <DesktopDatePicker
                                label="Đến ngày"
                                inputFormat="DD/MM/YYYY"
                                value={dateEnd}
                                onChange={handleChangeEnd}
                                renderInput={(params) => <TextField {...params} />}
                            />
                        </div>
                    </div>
                </LocalizationProvider>
            </div>
            <div className='chart'>
                <div className="chart-dt">
                    <h3>Biều đồ thống kê doanh thu</h3>
                    <Line data={data}/>
                </div>
                <div className="chart-dh">
                    <h3>Biều đồ thống kê đơn đặt hàng</h3>
                    <Pie data={dataTotalChart} />
                </div>

            </div>

        </div>
    );
}
