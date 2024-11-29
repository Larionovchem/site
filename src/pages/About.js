import React, { Component } from "react"
import "./Post.css"

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null,
        };
    }

    handleFileChange = (event) => {
        this.setState({ selectedFile: event.target.files[0] });
    };

    handleSubmit = (event) => {
        event.preventDefault();

        if (!this.state.selectedFile) {
            alert("Пожалуйста, выберите файл!");
            return;
        }

        const formData = new FormData();
        formData.append("file", this.state.selectedFile);

        fetch("https://example.com/upload", {
            method: "POST",
            body: formData,
        })
            .then((response) => response.json())
            .then((data) => {
                console.log("Успешно загружено:", data);
            })
            .catch((error) => {
                console.error("Ошибка загрузки файла:", error);
            });
    };
    render() {
        return (
            <div className="about-container">
                <h1 className="about-title">Загрузите свою фотографию</h1>
                <form onSubmit={this.handleSubmit} className="upload-form">
                    <label className="file-input-label">
                        <input
                            type="file"
                            onChange={this.handleFileChange}
                            className="file-input"
                        />
                        Выберите файл
                    </label>
                    <button type="submit" className="upload-button">
                        Отправить
                    </button>
                </form>
                {this.state.selectedFile && (
                    <div className="file-info">
                        <h3>Выбранный файл:</h3>
                        <p>{this.state.selectedFile.name}</p>
                    </div>
                )}
            </div>
        )
    }
}