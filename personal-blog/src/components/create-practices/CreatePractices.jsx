export function CreatePractices() {
    return (
        <article className="create-blog-postntainer">
            <img src="/images/create-blog-post-img.jpg" alt="" />
            <form>
                <h2>Добави практика</h2>
                <div className="form-group">
                    <label htmlFor="blogTitle">Заглавие:</label>
                    <input
                        type="text"
                        id="blogTitle"
                        name="blogTitle"
                        required />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Снимка:</label>
                    <input
                        type="text"
                        id="imageUrl"
                        name="imageUrl"
                        required />
                </div>

                <div className="form-group">
                    <label htmlFor="presentation">Презентация:</label>
                    <textarea
                        id="presentation"
                        name="presentation"
                        rows="5"
                        required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Съдържание:</label>
                    <textarea
                        id="content"
                        name="content"
                        rows="10"
                        required></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Дата:</label>
                    <input
                        type="date"
                        id="date"
                        name="date"
                        required />
                </div>

                <button type="submit" className="btn btn-register">Създай</button>
            </form>
        </article>
    )
}