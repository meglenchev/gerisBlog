import { useContext, useState } from "react";
import { useNavigate } from "react-router";
import { useRequest } from "../hooks/useRequest.js";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { storage } from "../../firebase.js";
import { endPoints } from "../../utils/endpoints.js";
import UserContext from "../../context/UserContext.jsx";

function validate(values) {
    let errors = {};

    if (!values.name) {
        errors['name'] = 'Името е задължително!';
    }

    if (!values.email) {
        errors['email'] = 'Имейла е задължителен!';
    }

    if (!values.shortInfo) {
        errors['shortInfo'] = 'Кратката презентация е задължителна!';
    }

    if (!values.facebook) {
        errors['facebook'] = 'Връзката за Facebook е задължителна!';
    }

    if (!values.instagram) {
        errors['instagram'] = 'Връзката за Instagram е задължителна!';
    }

    if (!(values.headerImage instanceof File) || values.headerImage.size === 0) {
        errors['headerImage'] = 'Снимка за "хедъра" на начална страница е задължителна!';
    }

    if (!(values.authorImage instanceof File) || values.authorImage.size === 0) {
        errors['authorImage'] = 'Снимка на автора за начална страница е задължителна!';
    }

    return errors;
}

export function UserSettings() {
    const { request } = useRequest();
    const navigate = useNavigate();
    const [isPending, setIsPending] = useState(false);

    const { setSettingsIdHandler } = useContext(UserContext);

    const uploadImage = async (imageFile) => {
        const imageRef = ref(storage, `images/${imageFile.name}`);
        const snapshot = await uploadBytes(imageRef, imageFile);
        return await getDownloadURL(snapshot.ref);
    };


    const submitSettingsHandler = async (e) => {
        e.preventDefault();

        const formData = new FormData(e.target);

        const formDataEntries = Object.fromEntries(formData);

        const errors = validate(formDataEntries);

        if (Object.keys(errors).length > 0) {
            return alert(Object.values(errors).at(0));;
        }

        const { headerImage, authorImage, ...settingsData } = formDataEntries;

        setIsPending(true);

        try {
            const [headerImageUrl, authorImageUrl] = await Promise.all([
                uploadImage(headerImage),
                uploadImage(authorImage)
            ]);

            if (headerImageUrl) {
                settingsData.headerImage = headerImageUrl
            };

            if (authorImageUrl) {
                settingsData.authorImage = authorImageUrl
            };

            const res = await request(endPoints.settings, 'POST', settingsData);

            const newId = res._id;

            setSettingsIdHandler(newId);

            setIsPending(false);

            navigate('/');
        } catch (err) {
            setIsPending(false);

            alert(`Възникна грешка: ${err.message}`);
        }
    }

    return (
        <article className="register-container">
            <img src="/images/register-img.jpg" alt="Регистрация" />
            <form onSubmit={submitSettingsHandler}>
                <h2>Настройки на страницата</h2>
                <div className="form-group-wrap">
                    <div className="form-group">
                        <label htmlFor="name">Име:</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                        />
                    </div>
                    <div className="form-group">
                        <label htmlFor="email">Имейл:</label>
                        <input
                            type="text"
                            id="email"
                            name="email"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="shortInfo">Кратка презентация:</label>
                    <textarea
                        id="shortInfo"
                        name="shortInfo"
                        rows="5"
                    ></textarea>
                </div>

                <div className="form-group-wrap">
                    <div className="form-group">
                        <label htmlFor="facebook">Facebook връзка:</label>
                        <input
                            type="text"
                            id="facebook"
                            name="facebook"
                        />
                    </div>

                    <div className="form-group">
                        <label htmlFor="instagram">Instagram връзка:</label>
                        <input
                            type="text"
                            id="instagram"
                            name="instagram"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="headerImage">Снимка за "хедъра" на начална страница:</label>
                    <input
                        type="file"
                        id="headerImage"
                        name="headerImage"
                        accept="image/*"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="authorImage">Снимка на автора за начална страница:</label>
                    <input
                        type="file"
                        id="authorImage"
                        name="authorImage"
                        accept="image/*"
                    />
                </div>
                
                {isPending
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : <button type="submit" className="btn btn-register">Запази промените</button>
                }
            </form>
        </article>
    )
}