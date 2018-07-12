import set from "object-set";
import { Schema } from "yup";

const asyncValidate = <T>(schema: Schema<T>) => {
    return async (values) => {
        return await schema
            .validate(values, {abortEarly: false})
            .then(() => {})
            .catch((errors) => {
                const formErrors = {};
                errors.inner.forEach((error) => {
                    set(formErrors, error.path, error.message);
                });
                throw formErrors;
            });
    }
}

export default asyncValidate;
