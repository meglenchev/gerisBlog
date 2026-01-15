import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { useRequest } from "../../hooks/useRequest.js";
import { endPoints } from "../../utils/endpoints.js";
import { uploadImage } from "../../hooks/uploadImage.js";
import { useForm } from "../../hooks/useForm.js";
import UserContext from "../../context/UserContext.jsx";

const initialSettingsValues = {
    slogan: '',
    aboutImage: '',
    summary: '',
    info: ''
}

function validate(values) {
    let errors = {};

    if (!values.slogan) {
        errors['slogan'] = 'Слоган е задължителен!';
    }

    if (!(values.aboutImage instanceof File) || values.aboutImage.size === 0) {
        errors['aboutImage'] = 'Снимка за "хедъра" е задължителна!';
    }

    if (!values.summary) {
        errors['summary'] = 'Резюмето е задължително!';
    }

    if (!values.info) {
        errors['info'] = 'Подробната информация е задължителна!';
    }

    return errors;
}

export function AboutCreate() {

    const { user, isAdmin } = useContext(UserContext);

    console.log(isAdmin, user)

    const { request } = useRequest();

    const navigate = useNavigate();

    const [isPendingUpload, setIsPendingUpload] = useState(false);

    useEffect(() => {
        document.title = 'Добавяне на информация за автора';
    }, []);

    const submitAboutHandler = async (formValues) => {
        const errors = validate(formValues);

        if (Object.keys(errors).length > 0) {
            return alert(Object.values(errors).at(0));;
        }

        const { aboutImage, ...aboutData } = formValues;

        setIsPendingUpload(true);

        try {
            const [aboutImageUrl] = await Promise.all([
                uploadImage(aboutImage)
            ]);

            if (aboutImageUrl) {
                aboutData.aboutImage = aboutImageUrl
            };

            await request(endPoints.aboutEdit, 'PUT', aboutData);

            setIsPendingUpload(false);

            navigate('/about');
        } catch (err) {
            setIsPendingUpload(false);

            alert(`Възникна грешка: ${err.message}`);
        }
    }

    const { inputPropertiesRegister, filePropertiesRegister, formAction } = useForm(submitAboutHandler, initialSettingsValues);

    return (
        <article className="register-container">
            <form onSubmit={formAction}>
                <h2>Информация за автора</h2>
                <div className="form-group">
                    <label htmlFor="slogan">Слоган</label>
                    <input
                        type="text"
                        id="slogan"
                        {...inputPropertiesRegister('slogan')}
                    />
                </div>

                <div className="form-group-wrap two">
                    <div className="form-group">
                        <label htmlFor="aboutImage">Снимка за "хедъра":</label>
                        <input
                            type="file"
                            id="aboutImage"
                            {...filePropertiesRegister('aboutImage')}
                            accept="image/*"
                        />
                    </div>
                </div>

                <div className="form-group">
                    <label htmlFor="summary">Резюме:</label>
                    <textarea
                        id="summary"
                        {...inputPropertiesRegister('summary')}
                        rows="3"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="info">Подробна информация:</label>
                    <textarea
                        id="info"
                        {...inputPropertiesRegister('info')}
                        rows="8"
                    ></textarea>
                </div>

                {isPendingUpload
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : <button type="submit" className="btn btn-settings">Запази настройките</button>
                }
            </form>
        </article>
    )
}