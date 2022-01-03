import React, {useState} from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Row, Col, Button, Card, CardBody, CardHeader, CardSubtitle, Spinner, Form, FormGroup, Label, Input } from 'reactstrap';
import { MutationSchemas } from '../data/schema';
import './Mutations.css';

function Mutations() {
    const mutations: MutationSchemas = new MutationSchemas();

    return (
        <div>
            <h4>
                Mutations represent various POST requests to update data about users.
            </h4>
            <Card>
                <CardHeader>Query - Displaying all data</CardHeader>
                <CardBody>
                    <AddUser mutations={mutations} />
                    
                  
                    
                </CardBody>
            </Card>

        </div>
    );
}

function AddUser({ mutations }: { mutations: MutationSchemas }) {

    const [active, setActive] = useState(false);



    const [addUser, { data, loading, error }] = useMutation(mutations.ADD_USER);

    if (loading) return <Spinner color='dark' />;
    if (error) return <React.Fragment>Error :(</React.Fragment>;

    function handleActiveCheck() {
        setActive(!active);
    }

    function handleSubmit(e: any): any {
        e.preventDefault();
        addUser({
            variables: {
                name: e.target.name.value,
                email: e.target.email.value,
                job_title: e.target.jobTitle.value,
                state: active,
                location: e.target.location.value,
            }
        });
    }

    return (
        <div>
            <Form className='addUserForm' onSubmit={handleSubmit}>
                <FormGroup>
                    <Label for='addUserInput1'>
                        Name
                    </Label>
                    <Input id='addUserInput1' name='name' type='text' />

                    <Label for='addUserInput2'>
                        Email
                    </Label>
                    <Input id='addUserInput2' name='email' type='text' />

                    <Label for='addUserInput4'>
                        Job Title
                    </Label>
                    <Input id='addUserInput4' name='jobTitle' type='text' />
                    <Label for='addUserInput5'>
                        Location
                    </Label>
                    <Input id='addUserInput5' name='location' type='text' />
                </FormGroup>
                <FormGroup check>
                    <Label check for='active'>
                        Active
                    </Label>
                    <Input id='active' name="isActive" type='checkbox' onChange={handleActiveCheck}/>
                </FormGroup>
                <Button type='submit'>Submit</Button>
            </Form>
            <div>
                <h4> Mutation Results </h4>
                <code>{JSON.stringify(data)}</code>
            </div>
        </div>
    );
}


function EditUser({ mutations }: { mutations: MutationSchemas }) {

    const [editUser, { data, loading, error }] = useMutation(mutations.EDIT_USER);

    if (loading) return <Spinner color='dark' />;
    if (error) return <React.Fragment>Error :(</React.Fragment>;

    return (
        <div>
            <Form className='editUserForm'>
                <FormGroup>
                    <Label for='editUserInput'>
                        Edit User Input
                    </Label>
                    <Input id='editUserInput' />
                </FormGroup>
            </Form>
            <div>
                <h4> Mutation Results </h4>
                <pre>{JSON.stringify(data)}</pre>
            </div>
        </div>
    );
}

function DeleteUser({ mutations }: { mutations: MutationSchemas }) {

    const [deleteUser, { data, loading, error }] = useMutation(mutations.DELETE_USER);

    if (loading) return <Spinner color='dark' />;
    if (error) return <React.Fragment>Error :(</React.Fragment>;

    return (
        <div>
            <Form className='deleteUserForm'>
                <FormGroup>
                    <Label>
                        Input without validation
                    </Label>
                    <Input />
                </FormGroup>
            </Form>
            <div>
                <h4> Mutation Results </h4>
                <pre>{JSON.stringify(data)}</pre>
            </div>
        </div>
    );
}

function UpdateUserState({ mutations }: { mutations: MutationSchemas }) {

    const [updateUserState, { data, loading, error }] = useMutation(mutations.UPDATE_USER_STATE);

    if (loading) return <Spinner color='dark' />;
    if (error) return <React.Fragment>Error :(</React.Fragment>;

    return (
        <div>
            <Form className='updateUserStateForm'>
                <FormGroup>
                    <Label>
                        Input without validation
                    </Label>
                    <Input />
                </FormGroup>
            </Form>
            <div>
                <h4> Mutation Results </h4>
                <pre>{JSON.stringify(data)}</pre>
            </div>
        </div>
    );
}


export default Mutations;