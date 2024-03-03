import Button from 'components/base/Button';
import ToolTip from 'components/base/Tooltip';
import Checkbox from 'components/base/form/Checkbox';
import Input from 'components/base/form/Input';

export default function VerifyForm() {
    return (
        <form className="bg-white p-10 ">
            <section className="grid grid-cols-2 gap-6">
                <Input
                    label="First name"
                    required
                    placeholder="Enter first name"
                    asterisk
                    // register={{ ...register('name') }}
                    // error={errors.name}
                    inputClassName="bg-white"
                />
                <Input
                    label="Last name"
                    required
                    placeholder="Enter last name"
                    asterisk
                    // register={{ ...register('address') }}
                    // error={errors.address}
                    inputClassName="bg-white"
                />

                <Input
                    label="National identificaton number"
                    type="number"
                    required
                    placeholder="Enter NIN number"
                    asterisk
                    // register={{ ...register('numberOfRooms') }}
                    // error={errors.numberOfRooms}
                    inputClassName="bg-white"
                />
                <Input
                    label="Email address"
                    type="email"
                    required
                    placeholder="Enter email address"
                    asterisk
                    // register={{ ...register('numberOfBath') }}
                    // error={errors.numberOfBath}
                    inputClassName="bg-white"
                />
                <Input
                    label="Phone number"
                    type="number"
                    required
                    placeholder="Enter phone number"
                    asterisk
                    // register={{ ...register('numberOfBath') }}
                    // error={errors.numberOfBath}
                    inputClassName="bg-white"
                />
            </section>

            <section className=" mt-10">
                <header className=" mb-8">
                    <div className="flex justify-between items-center mb-5">
                        <h3 className="flex items-center gap-2 text-[22px] font-semibold">
                            Payment Information
                            <ToolTip
                                className=""
                                icon={
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        width="20"
                                        height="21"
                                        viewBox="0 0 20 21"
                                        fill="none"
                                    >
                                        <path
                                            d="M9.16699 13H10.8337V14.6667H9.16699V13ZM9.16699 6.33333H10.8337V11.3333H9.16699V6.33333ZM10.0003 2.16667C5.39199 2.16667 1.66699 5.91667 1.66699 10.5C1.66699 12.7101 2.54497 14.8298 4.10777 16.3926C4.88159 17.1664 5.80025 17.7802 6.8113 18.199C7.82234 18.6178 8.90598 18.8333 10.0003 18.8333C12.2105 18.8333 14.3301 17.9554 15.8929 16.3926C17.4557 14.8298 18.3337 12.7101 18.3337 10.5C18.3337 9.40565 18.1181 8.32202 17.6993 7.31097C17.2805 6.29992 16.6667 5.38126 15.8929 4.60744C15.1191 3.83362 14.2004 3.21979 13.1894 2.801C12.1783 2.38221 11.0947 2.16667 10.0003 2.16667ZM10.0003 17.1667C8.23222 17.1667 6.53652 16.4643 5.28628 15.214C4.03604 13.9638 3.33366 12.2681 3.33366 10.5C3.33366 8.73189 4.03604 7.0362 5.28628 5.78595C6.53652 4.53571 8.23222 3.83333 10.0003 3.83333C11.7684 3.83333 13.4641 4.53571 14.7144 5.78595C15.9646 7.0362 16.667 8.73189 16.667 10.5C16.667 12.2681 15.9646 13.9638 14.7144 15.214C13.4641 16.4643 11.7684 17.1667 10.0003 17.1667Z"
                                            fill="#131313"
                                            fill-opacity="0.55"
                                        />
                                    </svg>
                                }
                                content="this is an explanation"
                            />
                        </h3>
                    </div>

                    <p>Add your card details below</p>
                </header>
                <div className="grid grid-cols-2 gap-6">
                    <Input
                        label="Card Number"
                        required
                        type="number"
                        placeholder="000 0000 0000 0000"
                        asterisk
                        // register={{ ...register('name') }}
                        // error={errors.name}
                        inputClassName="bg-white"
                    />
                    <Input
                        label="Cardholder's name"
                        required
                        placeholder="Enter name"
                        asterisk
                        // register={{ ...register('address') }}
                        // error={errors.address}
                        inputClassName="bg-white"
                    />
                </div>
                <div className="w-3/5 grid grid-cols-2 gap-6">
                    <Input
                        label="Expiry date"
                        type="date"
                        required
                        placeholder="MM/YY"
                        asterisk
                        // register={{ ...register('numberOfRooms') }}
                        // error={errors.numberOfRooms}
                        inputClassName="bg-white"
                    />
                    <Input
                        label="CVV"
                        type="number"
                        required
                        placeholder="CVV"
                        asterisk
                        // register={{ ...register('numberOfBath') }}
                        // error={errors.numberOfBath}
                        inputClassName="bg-white"
                    />
                </div>
            </section>

            <Checkbox
                className="mt-8"
                label={
                    <p>
                        By submitting this tenant verification request, You
                        agree with our{' '}
                        <span className="text-[#2F42EDD9] text-xs md:text-sm">
                            Terms and Conditions.
                        </span>
                    </p>
                }
                checked={true}
                // register={{ ...register('agreed') }}
                // error={errors.agreed}
            />

            <div className="w-1/2  mx-auto mb-10 mt-16">
                <Button className="w-full py-4">Submit Request</Button>
            </div>
        </form>
    );
}
