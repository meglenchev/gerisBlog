export function Blogs() {
    return (
        <article className="latest-posts">
            <h2>Публикации</h2>
            <div className="posts-container">
                <section className="post">
                    <img src="/images/last-post-image.jpg" alt="Post 1" />
                    <h3>Заглавие на публикация 1</h3>
                    <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Repudiandae nobis in praesentium
                        hic
                        aliquid possimus iste dolore maxime ducimus a? Praesentium eaque sed et vitae. Nulla
                        excepturi deleniti totam beatae voluptatibus! Commodi odit, fugiat architecto iste non
                        minima sequi cupiditate?</p>
                    <span className="post-date">01-03-2025</span>
                    <a href="#" className="btn" title="Прочети повече">Прочети</a>
                </section>
            </div>
        </article>
    )
}