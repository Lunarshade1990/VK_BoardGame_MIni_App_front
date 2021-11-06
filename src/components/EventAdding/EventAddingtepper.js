import {MobileStepper} from "@material-ui/core";
import {Button} from "@vkontakte/vkui";
import {Icon24BrowserBack, Icon24BrowserForward} from '@vkontakte/icons';

export const EventAddingStepper = (activePanel, panelArray) => {


    const onNextButtonClick = () => {

    }

    const onBackButtonClick = () => {

    }

    return (
        <MobileStepper
            variant="dots"
            steps={panelArray.length}
            position="static"
            activeStep={activeStep}
            nextButton={
                <Button
                    before={<Icon24BrowserForward/>}
                    onClick={}
                    disabled={}
                >
                    Назад
                </Button>
            }
            backButton={
                <Button
                    before={<Icon24BrowserBack/>}
                    onClick={}
                >
                    Вперёд
                </Button>
            }
        />
    )
}