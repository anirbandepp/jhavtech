// *** Import External Modules 
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// *** Import Internal Hooks 
import { useEffect, useState } from 'react';

// *** Import Custom Hooks
import useEmployees from '../hooks/useEmployees';
import useUploadCloudinary from '../hooks/useUploadCloudinary';

// *** Import Components
import Layout from '../components/BaseLayout/Layout';
import Spinner from '../components/Spinner/Spinner';
import ErrorUI from '../components/Error/ErrorUI';
import SuccessUI from '../components/Success/SuccessUI';

const HomePage = () => {

    const navigate = useNavigate();

    const { employees, loading: employeeLoading, error: employeeError } = useEmployees(`${import.meta.env.VITE_BACKEND_URL}/employee/get`);
    const { imageURL, imageUploading, imageUploadError, uploadImageHandler } = useUploadCloudinary();

    const [image, setImage] = useState(null);

    const [name, setName] = useState('');
    const [designation, setDesignation] = useState('');
    const [dob, setDOB] = useState('');
    const [experience, setExperience] = useState('1');
    const [RM, setRM] = useState('');

    const [sendingRequest, setSendingRequest] = useState(false);

    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');

    useEffect(() => {
        setImage(imageURL);

        if (imageUploadError) {
            setError(imageUploadError);
        } else {
            setError("");
        }

        if (employeeError) {
            setError(employeeError);
        } else {
            setError("");
        }

    }, [imageURL, imageUploadError, employeeError]);

    const userInputHandler = (e) => {

        setError("");

        if (e.target.name === "name") {
            setName(e.target.value);
        }

        if (e.target.name === "designation") {
            setDesignation(e.target.value);
        }

        if (e.target.name === "dob") {
            setDOB(e.target.value);
        }

        if (e.target.name === "experience") {
            setExperience(e.target.value);
        }

        if (e.target.name === "rm") {
            setRM(e.target.value);
        }
    }

    // *** Upload Files Into Cloudinary
    const uploadFile = async (event) => {
        try {
            const file = event.target.files[0];

            if (!file) return;

            const validTypes = ["image/png", "image/jpg", "image/jpeg"];
            const maxSize = 1 * 1024 * 1024; // 1MB in bytes

            if (!validTypes.includes(file.type)) {
                setError("Only PNG, JPG, and JPEG files are allowed.");
                return;
            }

            if (file.size > maxSize) {
                setError("File size must be less than 1MB.");
                return;
            }

            await uploadImageHandler(file);

        } catch (error) {
            console.log(error);
            setError(error.message);
        }
        finally {
            // TODO: 
        }
    }

    // *** Handler Submit
    async function handlerSumbit(event) {
        try {
            if (image == null) {
                setError('Please Select Employee Image');
                return;
            }

            if (name == '') {
                setError('Please Enter Employee Name');
                return;
            }

            if (designation == '') {
                setError('Please Enter designation');
                return;
            }

            if (dob == '') {
                setError('Please Enter Date of Birth');
                return;
            }

            if (experience == '') {
                setError('Please Enter Years of experience');
                return;
            }

            if (employees?.length != 0) {
                if (RM == '') {
                    setError('Please Select Reporting Manager');
                    return;
                }
            }

            setSendingRequest(true);

            const payload = {
                name: name,
                image: image,
                designation: designation,
                dateOfBirth: dob,
                yearofExperience: experience,
                reportingManager: RM
            };

            const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/employee/create`, payload);

            if (response?.status === 201) {
                const { message } = response?.data
                setSuccess(message);
                navigate(`/employee-tree`);
            } else {
                console.log(response);
            }
        } catch (error) {
            console.log(error);

            if (error.code === 'ERR_NETWORK') {
                setError('Network error. Please check your internet connection.');
            } else if (error.status == 400) {
                setError(error?.response?.data?.message);
            } else {
                setError('An error occurred. Please try again later.');
            }
        } finally {
            setSendingRequest(false);
        }
    }

    return (
        <Layout>
            <section className='container pb-5'>

                <h3 className='mb-3 text-center'>Add Employee</h3>

                <div className="row justify-content-center">

                    <div className="col-md-6">

                        <div className="card">
                            <div className="card-body">
                                <div className="mb-3 position-relative">
                                    <label htmlFor="formFile" className="form-label">Employee Image</label>
                                    <input className="form-control" type="file" id="formFile" onChange={uploadFile} />
                                    {imageUploading && <Spinner />}
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="inputName" className="form-label">Employee Name</label>
                                    <input type="text" className="form-control" id="inputName" name='name'
                                        onInput={(e) => userInputHandler(e)} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="Designation" className="form-label">Designation</label>
                                    <input type="text" className="form-control" id="Designation" name='designation'
                                        onInput={(e) => userInputHandler(e)} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="dob" className="form-label">Date of Birth</label>
                                    <input type="date" className="form-control" id="dob" name='dob'
                                        onInput={(e) => userInputHandler(e)} />
                                </div>

                                <div className="mb-3">
                                    <label htmlFor="YearsOfExperience" className="form-label">Years of experience</label>
                                    <input type="number" className="form-control" id="YearsOfExperience" min={1}
                                        value={experience} name='experience'
                                        onInput={(e) => userInputHandler(e)} />
                                </div>

                                {
                                    !employeeLoading
                                        ? <div className="mb-3">
                                            <label htmlFor="YearsOfExperience" className="form-label">Reporting Manager</label>
                                            <select className="form-select" aria-label="Default select example" name='rm'
                                                defaultValue={''} onChange={(e) => userInputHandler(e)} >
                                                <option value=''>---Select--</option>
                                                {
                                                    employees?.map((item) => (
                                                        <option value={item._id} key={item._id}>
                                                            {item?.name}
                                                        </option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                        : <p>Loading Reporting Managers</p>
                                }

                                {error && <ErrorUI message={error} />}

                                {success && <SuccessUI message={success} />}

                                <div className='row'>
                                    <div className="col-12">
                                        <button type="submit" className="btn btn-primary w-100"
                                            onClick={handlerSumbit}
                                            disabled={sendingRequest} >
                                            Create Record
                                        </button>
                                    </div>
                                </div>

                            </div>
                        </div>

                    </div>

                </div>

            </section>
        </Layout>
    )
}

export default HomePage;