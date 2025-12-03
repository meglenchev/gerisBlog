export function EditAuthorInfo() {
    return (
        <article className="create-about-author">
            <img src="/images/create-aboutn-info.jpg" alt="About author" />
            <form>
                <h2>Информация за автора</h2>
                <div className="form-group">
                    <label htmlFor="slogan">Слоган</label>
                    <input
                        type="text"
                        id="slogan"
                        name="slogan"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Снимка:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        required
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="summary">Резюме:</label>
                    <textarea
                        id="summary"
                        name="summary"
                        rows="5"
                        required
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="details">Подробна информация:</label>
                    <textarea
                        id="details"
                        name="details"
                        rows="10"
                        required
                    ></textarea>
                </div>

                <button type="submit" className="btn btn-register">Създай</button>
            </form>
        </article>
    )
}