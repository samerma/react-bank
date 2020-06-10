import React, { Component } from 'react';
import CanvasJSReact from '../canvasjs.react';
import '../App.css'
const CanvasJS = CanvasJSReact.CanvasJS;
const CanvasJSChart = CanvasJSReact.CanvasJSChart;

class Breakdown extends Component {
    getIncomeSum = (breakdown) => {
        let sum = 0
        for (let b in breakdown) {
            if (breakdown[b] > 0)
                sum += breakdown[b]
        }
        return sum
    }
    getExpensesSum = (breakdown) => {
        let sum = 0
        for (let b in breakdown) {
            if (breakdown[b] < 0) {
                let p = breakdown[b] * -1
                sum += p
            }
        }
        return sum
    }
    getCategoriesNames = (data) => {
        return data.map(t => t.category)
            .filter((value, index, self) => self.indexOf(value) === index)
    }
    getBreakdown = (transactions) => {
        const categories = this.getCategoriesNames(transactions)
        const breakdown = {}
        categories.forEach(c => {
            const sum = transactions.filter(t => t.category === c)
                .map(t => t.amount)
                .reduce((a, b) => a + b)
            breakdown[c] = sum
        })
        return breakdown
    }
    render() {
        const breakdown = this.getBreakdown(this.props.transactions)
        const incomeBreakdownDataPoints = Object.keys(breakdown)
            .filter(c => breakdown[c] > 0)
            .map(c => {
                return {
                    y: breakdown[c], //Math.floor(breakdown[c] / this.getIncomeSum(breakdown) * 100),
                    label: c
                }
            })
        const expensesBreakdownDataPoints = Object.keys(breakdown)
            .filter(c => breakdown[c] < 0)
            .map(c => {
                return {
                    y: breakdown[c] * -1,//Math.floor(breakdown[c] / this.getExpensesSum(breakdown) * -100),
                    label: c
                }
            })
        const incomeOptions = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark1", // "light1", "dark1", "dark2"
            title: {
                text: "Income"
            },
            data: [{
                type: "pie",
                indexLabel: "{label}: ${y}",
                startAngle: -90,
                dataPoints: incomeBreakdownDataPoints
            }]
        }
        const expensesOptions = {
            animationEnabled: true,
            exportEnabled: true,
            theme: "dark1", // "light1", "dark1", "dark2"
            title: {
                text: "Expenses"
            },
            data: [{
                type: "pie",
                indexLabel: "{label}: ${y}",
                startAngle: -90,
                dataPoints: expensesBreakdownDataPoints
            }]
        }
        return (
            <div className='breakdown-container'>
                <CanvasJSChart className='chart' options={incomeOptions} />
                <CanvasJSChart className='chart' options={expensesOptions} />
            </div>
        )
    }
}

export default Breakdown;