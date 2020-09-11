import { POST } from '../graphql/mutations/post';

export const START_POST = 'START_POST';
export const SUCCESSFUL_POST = 'SUCCESSFUL_POST';
export const FAILED_POST = 'FAILED_POST';
export const CLEAR_POST_STATUS = 'CLEAR_POST_STATUS';

export const startPost = () => ({
    type: START_POST
});

export const successfulPost = () => ({
    type: SUCCESSFUL_POST
});

export const failedPost = () => ({
    type: FAILED_POST
});

export const clearPostStatus = () => ({
    type: CLEAR_POST_STATUS
});

export const post = (title, content, isHaiku) => async (
    dispatch, getState, client
) => {
    dispatch(startPost());
    try {
        const result = await client.mutate({
            mutation: POST,
            variables: {
                title,
                content,
                isHaiku
            }
        });
        console.log(result);
        dispatch(successfulPost());
    } catch(e) {
        dispatch(failedPost());
    }
}