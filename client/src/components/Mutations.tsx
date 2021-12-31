import React from 'react';
import { useMutation } from '@apollo/react-hooks';
import { Row, Col, Card, CardBody, CardHeader, CardSubtitle, Spinner, Form, FormGroup, Label, Input } from 'reactstrap';
import { MutationSchemas } from '../data/schema';
import { queries } from '@testing-library/react';

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
                    <EditUser mutations={mutations} />
                    <DeleteUser mutations={mutations} />
                    <UpdateUserState mutations={mutations} />
                </CardBody>
            </Card>

        </div>
    );
}

function AddUser({ mutations }: { mutations: MutationSchemas }) {

    const [addUser, { data, loading, error }] = useMutation(mutations.ADD_USER);

    if (loading) return <Spinner color="dark" />;
    if (error) return <React.Fragment>Error :(</React.Fragment>;

    return (
        <div>
            <Form></Form>
            <div>
                <h4> Mutation Results </h4>
                <pre>{JSON.stringify(data)}</pre>
            </div>
        </div>
    );
}

function EditUser({ mutations }: { mutations: MutationSchemas }) {

    const [editUser, { data, loading, error }] = useMutation(mutations.EDIT_USER);

    if (loading) return <Spinner color="dark" />;
    if (error) return <React.Fragment>Error :(</React.Fragment>;

    return (
        <div>
            <Form></Form>
            <div>
                <h4> Mutation Results </h4>
                <pre>{JSON.stringify(data)}</pre>
            </div>
        </div>
    );
}

function DeleteUser({ mutations }: { mutations: MutationSchemas }) {

    const [deleteUser, { data, loading, error }] = useMutation(mutations.DELETE_USER);

    if (loading) return <Spinner color="dark" />;
    if (error) return <React.Fragment>Error :(</React.Fragment>;

    return (
        <div>
            <Form></Form>
            <div>
                <h4> Mutation Results </h4>
                <pre>{JSON.stringify(data)}</pre>
            </div>
        </div>
    );
}

function UpdateUserState({ mutations }: { mutations: MutationSchemas }) {

    const [updateUserState, { data, loading, error }] = useMutation(mutations.UPDATE_USER_STATE);

    if (loading) return <Spinner color="dark" />;
    if (error) return <React.Fragment>Error :(</React.Fragment>;

    return (
        <div>
            <Form></Form>
            <div>
                <h4> Mutation Results </h4>
                <pre>{JSON.stringify(data)}</pre>
            </div>
        </div>
    );
}

export default Mutations;