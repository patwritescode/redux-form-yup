# redux-form-yup

[![npm version](https://badge.fury.io/js/redux-form-yup.svg)](https://badge.fury.io/js/tinjector)

### What is this?

This is an async validation function that takes in a `yup` schema and validates your `redux-form` form and automatically maps back errors to the proper structure.

### Setup

`npm install redux-form-yup`

###### Create your yup schema

The structure of your schema should exactly match the structure of values return from your form. Yup will allow you to create complex object schemas as well as work with validating arrays.

```javascript
const schema = yup
    .object()
    .shape({ 
        firstName: yup.string().required(), 
        lastName: yup.string().required(),
        email: yup.string().email().required(),
        address: yup.object().shape({
            street: yup.string.required(),
            city: yup.string.required(),
            state: yup.string.required().min(2).max(2),
            zip: yup.number(),
        })
    });
```

So the above would look maybe something like:

```javascript
    <Field name="firstName" component={customRender} type="text" />
    <Field name="lastName" component={customRender} type="text" />
    <Field name="email" component={customRender} type="text" />
    <FormSection name="address">
        <Field name="street" component={customRender} type="text" />
        <Field name="city" component={customRender} type="text" />
        <Field name="state" component={customRender} type="text" />
        <Field name="zip" component={customRender} type="text" />
    </FormSection>
```

###### Import asyncValidate and shouldAsyncValidate from `redux-form-yup`

`shouldAsyncValidate` will help the enforce the yup schema to always run. In the future there will be some additional options.

`import {asyncValidate, shouldAsyncValidate} from "redux-form-yup"`

###### Add both as options to your HoC

```javascript
export default reduxForm({
    form: "contact",
    asyncValidate: asyncValidate(schema),
    shouldAsyncValidate,
})(ContactForm);
```

### TypeScript

`redux-form-yup` was made with TypeScript and as such its own types are bundled. You will need your own types for `yup` and `redux-form`.
