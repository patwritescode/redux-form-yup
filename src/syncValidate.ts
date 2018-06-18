import set from "object-set";
import { Schema } from "yup";

const syncValidate = <T>(schema: Schema<T>) => values => {
	const formErrors = {};
	try {
		schema.validateSync(values, { abortEarly: false });
	} catch (errors) {
		errors.inner.forEach((error) => {
			set(formErrors, error.path, error.message);
		});
	}
	return formErrors;
}

export default syncValidate;