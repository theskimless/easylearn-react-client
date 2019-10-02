import React, {useState} from "react";
import Modal from "../Modal/Modal"; 


export default props => {
    let [isModalOpened, toggleModal] = useState(false);

    return (
        <>
            <div className="text-center block-m">
                <button className="block-shadow round-btn plus-btn" onClick={() => toggleModal(true)}></button>
            </div>

            {isModalOpened && (
                <Modal title="Add word" onClose={() => toggleModal(false)}>
                    <div>
                        <div className="form-inp-title">Word</div>
                        <input type="text" />
                    </div>

                    <div>
                        <button>ADD</button>
                    </div>
                </Modal>
            )}
        </>
    );
};