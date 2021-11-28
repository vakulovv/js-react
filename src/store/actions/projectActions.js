import "firebase/firestore";
import _ from "lodash"

export const FETCH_PROJECTS_BEGIN = "FETCH_PROJECTS_BEGIN";
export const FETCH_PROJECTS_SUCCESS = "FETCH_PROJECTS_SUCCESS";
export const FETCH_PROJECTS_FAILURE = "FETCH_PROJECTS_FAILURE";

export const getProjects = (filters, lastVisible = false) => {
    return async (dispatch, getState, { getFirebase }) => {
        const usersPerPage = 5;
        const firebase = getFirebase();
        const result = [];

        let snapshot = firebase
            .firestore()
            .collection("projects");

        // query where
        _.each(filters, (value, name) => {
            if (!_.isEmpty(value)) {
                snapshot = snapshot.where(`${name}`, "==", value);
            }
        });

        // Get total size snapshot
        const totalData = await snapshot.get();
        const count = totalData.size;

        const data = await snapshot
            .orderBy("created")
            .startAfter(lastVisible ? lastVisible.created : null )
            .limit(usersPerPage)
            .get();

        for (const doc of data.docs) {
            const user = await firebase
                .firestore()
                .collection("user")
                .doc(doc.data().userId)
                .get();

            const item = {
                id: doc.id,
                userName: user.data()?.firstName,
                ...doc.data()
            };
            result.push(item);
        }

        dispatch({
            type: "FETCH_PROJECTS_SUCCESS",
            payload: result,
            count: count,
            isAppend: !!lastVisible
        });
    };
};

export const getProjectById = (id) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const snapshot = firebase
            .firestore()
            .collection("projects");
        snapshot
            .doc(id)
            .get()
            .then((docs) => {
                const result = docs.data();
                dispatch({ type: "FETCH_PROJECTS_SUCCESS", payload: result});
            })
            .catch((error) => {
                console.log("error", error);
                dispatch({ type: "ERROR_FETCH", error });
            });
    };
};

export const createProject = (project, userId) => {
    return async (dispatch, getState, { getFirebase }) => {
        const firebase = getFirebase();
        const snapshot = await firebase.firestore().collection("projects").get();
        const success = snapshot.docs.map((doc) => doc.data());
        const created = new Date().getTime();
        firebase
            .firestore()
            .collection("projects")
            .add({ ...project, userId, created })
            .then((ref) => {
                console.log("Added doc with ID: ", ref.id);
                dispatch({ type: "CREATE_PROJECT", payload: success });
                setTimeout(() => {
                    if (typeof window !== "undefined") {
                        window.location.href = "/";
                    }
                }, 1500);
            })
            .catch(() => {});
    };
};

export const editProject = (id, project, userId) => {
    return async (dispatch, getState, { getFirebase }) => {
        const sleep = (ms) => new Promise((r) => setTimeout(r, ms));

        const firebase = getFirebase();
        const snapshot = await firebase.firestore().collection("projects").get();
        const success = snapshot.docs.map((doc) => doc.data());
        const created = new Date().getTime();
        await sleep(300);
        firebase
            .firestore()
            .collection("projects")
            .doc(id)
            .set({ ...project, userId, created })
            .then(() => {
                dispatch({ type: "CREATE_PROJECT", payload: success });
                setTimeout(() => {
                    if (typeof window !== "undefined") {
                        window.location.href = "/";
                    }
                }, 1500);
            })
            .catch(() => {
                //dispatch({ type: ERROR_EDIT, error });
            });
    };
};
