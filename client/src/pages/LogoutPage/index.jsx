import React, { useEffect } from 'react';
import { notification } from 'antd';
import { useAuthState } from 'react-firebase-hooks/auth';
import fbase from '../../firebase';

const LogoutPage = ({ history }) => {
    const [user, loading, error] = useAuthState(fbase.auth);

    useEffect(() => {
        // make sure they're logged in
        if (loading || !user) return;

        fbase.logout(() => {
            // successfully logged out!
            notification.success({
                message: 'Success!',
                description: 'You are now logged out!'
            });
    
            history.push('/');
        }, (err) => {
            notification.error({
                message: 'Logout Error',
                description: err.message
            });
        });
    }, [loading]);

    if (loading) {
        // can replace?
        return (
        <div>
            <p>Loading...</p>
        </div>
        );
    }

    if (error) {
        // can replace?
        return (
        <div>
            <p>
            Error: <b>{error}</b>
            </p>
        </div>
        );
    }

    if (!user) {
        // not logged in
        history.push('/');

        // we have to return something so we'll return an empty page.
        return <div></div>;
    }

    return (<div>
        <p>Logging out...</p>
    </div>);
};

export default LogoutPage;