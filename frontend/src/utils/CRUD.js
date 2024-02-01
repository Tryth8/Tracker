import React, {useEffect, useState} from "react";
import useAxios from "./useAxios";
import MyModal from "../components/components";

function ManageEntities({entityName, apiEndpoint, inputs}) {
    const [entities, setEntities] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const pageSize = 4;
    const [entitiesCount, setEntitiesCount] = useState(0);
    const [selectedEntity, setSelectedEntity] = useState(null);
    const [completedStatus, setCompletedStatus] = useState({});
    const api = useAxios();

    useEffect(() => {
        getEntities(currentPage);
    }, [currentPage]);

    const getEntities = async (page = 1) => {
        const response = await api.get(`${apiEndpoint}/?page=${page}&page_size=${pageSize}`);
        if (response.status === 200) {
            setEntities(response.data.results);
            setEntitiesCount(response.data.count);

            const status = {};
            response.data.results.forEach(entity => {
                status[entity.id] = entity.completed;
            });
            setCompletedStatus(status);
        }
    };

    let totalPages = Math.ceil(entitiesCount / pageSize)

    const handlePageChange = (newPage) => {
        console.log("page changed")
        setCurrentPage(newPage);
    };

    const createEntity = async (e) => {
        e.preventDefault();
        const requestData = {};
        inputs.forEach(input => {
            requestData[input] = e.target[input].value;
        })
        const response = await api.post(`/create_${entityName}/`, requestData);
        window.location.reload();
    };

    let deleteEntity = async (entityID) => {
        let response = await api.delete(`${apiEndpoint}/${entityID}/delete/`);
        window.location.reload();
    }

    const editEntity = async (e, entityID) => {
        const requestData = {};
        inputs.forEach(input => {
            requestData[input] = e.target[input].value;
        })
        const response = await api.put(`${apiEndpoint}/${entityID}/`, requestData);
    };

    function handleEditClick(entity) {
        setSelectedEntity(entity);

        const modalElement = document.getElementById("editEntityModal");

        if (modalElement) {
            const modal = new window.bootstrap.Modal(modalElement);
            modal.show();
        }
    }

    const handleCheckClick = async (entityID, isChecked) => {
        const response = await api.put(`${apiEndpoint}/${entityID}/`, {completed: isChecked});
        if (response.status === 200) {
            setCompletedStatus(prevStatus => ({
                ...prevStatus,
                [entityID]: isChecked,
            }));
        }
    }

    const renderPaginationControls = () => {
        return (
            <nav aria-label="Page navigation">
                <ul className="pagination">
                    <li className={`page-item ${currentPage === 1 ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
                            Previous
                        </button>
                    </li>
                    {[...Array(totalPages).keys()].map((page) => (
                        <li key={page + 1} className={`page-item ${currentPage === page + 1 ? 'active' : ''}`}>
                            <button className="page-link" onClick={() => handlePageChange(page + 1)}>
                                {page + 1}
                            </button>
                        </li>
                    ))}
                    <li className={`page-item ${currentPage === totalPages ? 'disabled' : ''}`}>
                        <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                            Next
                        </button>
                    </li>
                </ul>
            </nav>
        )
    }


    return (
        <>
            <button type="button" className="btn btn-primary" data-bs-toggle="modal"
                    data-bs-target="#createEntityModal">Create New
            </button>
            <MyModal inputs={inputs} onSubmit={(e) => createEntity(e)} modalID="createEntityModal"/>

            {renderPaginationControls()}
            <ul className="list-group mt-4">
                {entities.map(entity => (
                    <li key={entity.id} className="list-group-item d-flex justify-content-between align-items-center">
                        <div className="data">
                            {Object.keys(entity)
                                .filter(key => key !== 'id' && key !== 'completed')
                                .map(key => (
                                    <p key={key}><strong>{key.replace(/_/g, ' ').replace(/\b\w/g, (match) => match.toUpperCase())}:</strong> {entity[key]}</p>
                                ))
                            }
                        </div>

                        <div className="d-flex align-items-center">
                            <i
                                onClick={() => {
                                    handleEditClick(entity);
                                }}
                                className="bi bi-pencil-square"
                                data-bs-toggle="modal"
                                data-bs-target="#editEntityModal"
                            />
                            <i onClick={() => {
                                deleteEntity(entity.id)
                            }} className="bi bi-trash"/>

                            {entityName === "task" ?
                                <div className="form-check">
                                    <input checked={completedStatus[entity.id]} onChange={(e) => {
                                        handleCheckClick(entity.id, !completedStatus[entity.id])
                                    }} className="form-check-input" type="checkbox"/>
                                    <label className="form-check-label" htmlFor={`entity${entity.id}`}></label>
                                </div> : null}
                        </div>
                    </li>
                ))}
            </ul>
            {renderPaginationControls()}
            <MyModal modalType="Edit" selectedEntity={selectedEntity} inputs={inputs}
                     onSubmit={(e) => editEntity(e, selectedEntity.id)} modalID="editEntityModal"/>
        </>
    )
}

export default ManageEntities;