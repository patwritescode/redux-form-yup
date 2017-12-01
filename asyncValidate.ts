import * as set from "object-set";

const asyncValidate = (schema) => {
    return async (values) => {
        return await schema
            .validate(values, {abortEarly: false})
            .then(() => {})
            .catch((errors) => {
                const formErrors = {};
                errors.inner.foreach((error) => {
                    set(formErrors, error.path, error.message);
                });
                return formErrors;
            });
    }
}

export default asyncValidate;