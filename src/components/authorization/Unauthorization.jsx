import { useNavigate } from "react-router-dom";

const Unathorized = () => {
    const navigate = useNavigate();
    const turnBack = () => navigate(-1);

    return (
        <section className="unauthorized-section">
            <h1>Access denied, unauthorized access</h1>
            <br/>
            <p> You do not have access to this page</p>
            <div className="no-access-btn-container">
                <button className="btn-style" onclick={turnBack}>Go Back</button>
            </div>
        </section>
    )
}

export default Unathorized;