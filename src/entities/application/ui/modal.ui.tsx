import Button from "@/components/button"
import { RdyInput, RdyModal } from "rdy-comp"

export const ApplicationModalUi = () => {
    return (
        <RdyModal
            id={'send-application'}
            title={'Отправить заявку на покупку'}
            close
            className=""
            width="1000px"
        >
            <div className="flex flex-col gap-5">
                <div className="flex gap-5">
                    <div className="w-full flex flex-col gap-8">
                        <RdyInput
                            id="fullname"
                            label="ФИО"
                            rounded={'xl'}
                            className="text-lg text-gray-700!"
                            backgroundColor={{
                                onBlur: '#fff',
                                onFocus: '#fff'
                            }}
                            labelColor={{
                                onBlur: '',
                                onFocus: '#b72b3a'
                            }}
                            bordered={{
                                onBlur: '#d5d5d5',
                                onFocus: '#7b7b7b',
                            }}
                        />
                        <RdyInput
                            id="email"
                            backgroundColor={{
                                onBlur: '#fff',
                                onFocus: '#fff'
                            }}
                            label="E-mail"
                            rounded={'xl'}
                            labelColor={{
                                onBlur: '',
                                onFocus: '#b72b3a'
                            }}
                            bordered={{
                                onBlur: '#d5d5d5',
                                onFocus: '#7b7b7b',
                            }}
                            className="text-lg text-gray-700!"
                        />
                        <RdyInput
                            id="email"
                            backgroundColor={{
                                onBlur: '#fff',
                                onFocus: '#fff'
                            }}
                            label="Номер телефона"
                            rounded={'xl'}
                            labelColor={{
                                onBlur: '',
                                onFocus: '#b72b3a'
                            }}
                            bordered={{
                                onBlur: '#d5d5d5',
                                onFocus: '#7b7b7b',
                            }}
                            className="text-lg text-gray-700!"
                        />
                        <Button className="rounded-xl py-2.5! mt-4">
                            Отправить
                        </Button>
                    </div>
                    <div className="w-full">
                        <textarea
                            name=""
                            id=""
                            className="w-full h-full p-4 py-2"
                            placeholder="Отправьте нам сообщение, и мы с вами свяжемся. Все поля обязательны для заполнения">
                        </textarea>
                    </div>
                </div>
            </div>
        </RdyModal>
    )
}