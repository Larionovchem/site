import React, { Component } from "react"
import "./Post.css"

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            selectedFile: null, // Хранит файл
            previewUrl: null,   // Хранит для предпросмотра изображения
        };
    }

    handleFileChange = (event) => {
        const file = event.target.files[0]; // Получаем выбранный файл
        if (!file) return;

        this.setState({ selectedFile: file });

        // Создаем FileReader для генерации 
        const reader = new FileReader();
        reader.onload = (e) => {
            this.setState({ previewUrl: e.target.result }); 
        };
        reader.readAsDataURL(file); // Читаем файл как Data URL
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
                            accept="image/*"
                            onChange={this.handleFileChange}
                            className="file-input"
                        />
                        Выберите файл
                    </label>
                    <button type="submit" className="upload-button">
                        Отправить
                    </button>
                </form>

                {/* Информация о выбранном файле */}
                {this.state.selectedFile && (
                    <div className="file-info">
                        <h3>Выбранный файл:</h3>
                        <p>{this.state.selectedFile.name}</p>
                    </div>
                )}

                {/* Предпросмотр изображения */}
                {this.state.previewUrl && (
                    <img
                        src={this.state.previewUrl}
                        alt="Preview"
                        style={{
                            maxWidth: "100%",
                            maxHeight: "300px",
                            marginTop: "20px",
                        }}
                    />
                )}
            </div>
        );
    }
}
