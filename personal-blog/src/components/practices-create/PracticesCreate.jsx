import { useNavigate, useParams } from "react-router";
import { useRequest } from "../../hooks/useRequest.js";
import { useContext, useState } from "react";
import { endPoints } from "../../utils/endpoints.js";
import { useForm } from "../../hooks/useForm.js";
import { useEffect } from "react";
import { uploadImage } from "../../hooks/uploadImage.js";
import UserContext from "../../context/UserContext.jsx";


const initialPracticeValues = {
    title: '',
    imageUrl: '',
    presentation: '',
    content: '',
    date: ''
}

export function PracticesCreate({ mode }) {
    const { practiceId } = useParams();

    const { request } = useRequest();

    const navigate = useNavigate();

    const [isPending, setIsPending] = useState(false);

    const { user } = useContext(UserContext);

    const isEditMode = mode === 'edit';

    const config = {
        method: isEditMode ? 'PUT' : 'POST',
        url: isEditMode ? endPoints.practiceDetails(practiceId) : endPoints.postPractices,
        navigateTo: isEditMode ? `/practices/${practiceId}/details` : '/practices',
        errMsg: isEditMode ? 'Неуспешно редактиране на практика' : 'Неуспешно създаване на практика'
    };

    function validate(values) {

        if (!values.title) {
            return 'Заглавието е задължително!';
        }

        const noImage = isEditMode 
            ? !values.imageUrl 
            : ( !(values.imageUrl instanceof File) || values.imageUrl.size === 0 );

        if (noImage) return 'Снимката е задължителна!';

        if (!values.presentation) {
            return 'Кратката презентация е задължителна!';
        }

        if (!values.content) {
            return 'Съдържанието е задължително!';
        }

        if (!values.date) {
            return 'Датата е задължителна!';
        }

        return null;
    }

    const submitEditHandler = async (formValues) => {
        const errors = validate(formValues);

        if (errors) {
            alert(errors);
            return;
        }

        setIsPending(true);

        try {
            const practiceData = { ...formValues };

            if (practiceData.imageUrl instanceof File) {
                practiceData.imageUrl = await uploadImage(practiceData.imageUrl);
            }

            await request(config.url, config.method, practiceData);

            setIsPending(false);

            navigate(config.navigateTo);
        } catch (err) {
            alert(`${config.errMsg}: ${err.message}`);
        } finally {
            setIsPending(false);
        }
    }

    const { inputPropertiesRegister, filePropertiesRegister, setFormValues, formAction } = useForm(submitEditHandler, initialPracticeValues);

    useEffect(() => {
        document.title = isEditMode ? 'Редактирай практика' : 'Добави практика';

        if (!isEditMode) {
            setFormValues(initialPracticeValues);
            return;
        }
        const abortController = new AbortController();

        request(endPoints.practiceDetails(practiceId), 'GET', null, abortController.signal)
            .then(result => {
                if (user._id !== result._ownerId) {
                    return navigate('/');
                }

                setFormValues(result);
            })
            .catch(err => {
                if (err.name !== 'AbortError') {
                    alert(`Неуспешно зареждане на информацията: ${err.message}`);
                }
            })

        return () => {
            abortController.abort();
        }
    }, [request, practiceId, setFormValues, navigate, user._id, isEditMode]);

    return (
        <article className="create-blog-post-container">
            <img src="/images/create-blog-post-img.jpg" alt="" />
            <form onSubmit={formAction}>
                <h2>Добави практика</h2>
                <div className="form-group">
                    <label htmlFor="title">Заглавие:</label>
                    <input
                        type="text"
                        id="title"
                        {...inputPropertiesRegister('title')}
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="imageUrl">Снимка:</label>
                    <input
                        type="file"
                        id="imageUrl"
                        {...filePropertiesRegister('imageUrl')}
                        accept="image/*"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="presentation">Презентация:</label>
                    <textarea
                        id="presentation"
                        {...inputPropertiesRegister('presentation')}
                        rows="5"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Съдържание:</label>
                    <textarea
                        id="content"
                        {...inputPropertiesRegister('content')}
                        rows="10"
                    ></textarea>
                </div>

                <div className="form-group">
                    <label htmlFor="content">Кога ще се проведе практиката:</label>
                    <input
                        type="date"
                        id="date"
                        {...inputPropertiesRegister('date')}
                    />
                </div>

                {isPending
                    ? <div className="loader"><img src="/images/loading.svg" alt="Зареждане" /></div>
                    : <button type="submit" className="btn btn-register">Редактирай</button>
                }
            </form>
        </article>
    )
}