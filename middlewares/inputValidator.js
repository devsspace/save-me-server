import validator from "validator";

function inputValidator(input){
  return validator.escape(input);
}