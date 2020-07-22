import IFormValue from "../FormInput/IFormValue";

export default interface IOrganizationInputProps {
    onChange: (organizationId: IFormValue<string>) => void;
    value: string;
    id: string;
}