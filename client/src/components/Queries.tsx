import React from 'react';
import { useQuery } from '@apollo/react-hooks';
import { Row, Col, Card, CardBody, CardHeader, CardSubtitle, Spinner } from 'reactstrap';
import { QuerySchemas } from '../data/schema';

function Queries() {
    const queries = new QuerySchemas();
    const getAllUsers = useQuery(queries.GET_USERS);
    const activeUsers = useQuery(queries.VIEW_USERS_BY_STATE, { variables: { state: true } });

    if (getAllUsers.loading || activeUsers.loading) return <Spinner color="dark" />;
    if (getAllUsers.error || activeUsers.error) return <React.Fragment>Error :(</React.Fragment>;

    return (
        <div>

            <h3>
                Queries represent various GET requests to get data about users.
            </h3>

            <Card>
                <CardHeader>Query - Displaying all data</CardHeader>
                <CardBody>
                    <code>
                        {JSON.stringify(getAllUsers.data, null, 2)}
                    </code>
                </CardBody>
            </Card>
            <Card>
                <CardHeader>Query - Displaying data with args</CardHeader>
                <CardBody>
                    <CardSubtitle>Viewing all names and emails of users that are active users </CardSubtitle>
                    <code>
                        {JSON.stringify(activeUsers.data, null, 2)}
                    </code>
                </CardBody>
            </Card>

        </div>
    );
}

export default Queries;