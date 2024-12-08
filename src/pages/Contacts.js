import React, { Component } from "react";
import Papa from "papaparse";

export default class Contacts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: [], // Сюда будет сохраняться таблица
            columns: [], // Колонки для таблицы
        };
    }

    // Обработка загрузки файла
    handleFileUpload = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            const csvData = Papa.parse(e.target.result, { header: true });
            this.setState({
                data: csvData.data,
                columns: csvData.meta.fields, // Сохраняем заголовки колонок
            });
        };
        reader.readAsText(file);
    };

    // Обновление данных в таблице
    handleChange = (rowIndex, columnId, value) => {
        const newData = [...this.state.data];
        newData[rowIndex][columnId] = value;
        this.setState({ data: newData });
    };

    // Отправка данных на сервер
    handleSave = () => {
        fetch('/api/save', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(this.state.data),
        })
            .then((response) => response.json())
            .then(() => alert("Data saved successfully!"))
            .catch((error) => console.error("Error saving data:", error));
    };

    renderTable = () => {
        const { data, columns } = this.state;

        if (data.length === 0 || columns.length === 0) {
            return <div>No data to display</div>;
        }

        return (
            <table border="1">
                <thead>
                    <tr>
                        {columns.map((column) => (
                            <th key={column}>{column}</th>
                        ))}
                    </tr>
                </thead>
                <tbody>
                    {data.map((row, rowIndex) => (
                        <tr key={rowIndex}>
                            {columns.map((column) => (
                                <td key={column}>
                                    <input
                                        type="text"
                                        value={row[column] || ""}
                                        onChange={(e) =>
                                            this.handleChange(rowIndex, column, e.target.value)
                                        }
                                    />
                                </td>
                            ))}
                        </tr>
                    ))}
                </tbody>
            </table>
        );
    };

    render() {
        return (
            <div>
                <h1>Contacts</h1>
                <input
                    type="file"
                    accept=".csv"
                    onChange={this.handleFileUpload}
                />
                <div>{this.renderTable()}</div>
                <button onClick={this.handleSave}>Save Changes</button>
            </div>
        );
    }
}
