Dynamic Form Manager
====================

Description
-----------

This React-based application handles dynamic forms with various field types including text inputs, text areas, dropdowns, checkboxes, and radio buttons. It features custom hooks for state management and modularity.

Features
--------

-   Dynamic Form Fields: Add or remove form fields dynamically.
-   Supported Field Types: Text input, text area, dropdown, checkbox, radio button.
-   Form Configuration: Save and load configurations as JSON.
-   Form Validation: Basic validation and error messaging.
-   Custom Hooks: `useDynamicForm` for managing form states.

Installation
------------

Clone the repository and install dependencies:


`git clone https://github.com/dk19999/dynamic-form-generator.git`

`cd dynamic-form-manager`

`npm install`


Usage
-----

Start the application:

`npm start`

Components
----------

-   `DynamicForm`: Renders the dynamic form.
-   `FieldModal`: Modal for adding/editing fields.
-   `FormFieldRow`: Displays each field in the form.
-   `BaseButton`: Reusable button component.
-   `TextInput`: Reusable text input component.
-   `TextArea`: Reusable text area component.

Custom Hooks
------------

-   `useDynamicForm`: Manages state and logic of the dynamic form.