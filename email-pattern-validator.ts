import { AbstractControl } from '@angular/forms'

export function emailPatternValidator(
  control: AbstractControl
): { [key: string]: any } | null {
    const valid = /^$|^([\w\.\-]+)@([\w\-]+)((\.(\w){2,3})+)$/.test(control.value)
  return valid
    ? null
    : { invalidEmail: { valid: false, value: control.value } }
}