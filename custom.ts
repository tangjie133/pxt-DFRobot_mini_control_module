
/**
 * 使用此文件来定义自定义函数和图形块。
 * 想了解更详细的信息，请前往 https://makecode.microbit.org/blocks/custom
 */

enum MyEnum {
    //% block="Button A"
    ButtonA,
    //% block="Button B"
    ButtonB, 
    //% block="Button C"
    ButtonC, 
    //% block="Button D"
    ButtonD, 
}

enum MyEnum1 {
    //% block="Button X"
    ButtonX,
    //% block="Button Y"
    ButtonY, 
}


//% weight=100 color=#0fbc11 icon="" block="mini control module"
namespace custom {
    let addrI2C = 0x44;
    //% advanced=true shim=minii2c::init
    function init(): void {
        return;
    }
     /**
     * TODO: 初始化I2C
     */
     //% block="init I2C"
    export function initEquipment():void{
        init();
    }
    
    /**
     * TODO: 读取按键ABCD状态
     * @param button 按键选择
     */
    //% block="get %button static"
    export function getButtonStatic(button: MyEnum): number {
        pins.i2cWriteNumber(addrI2C, 0xB1, NumberFormat.Int8LE);
        //basic.pause(50)
        let data = pins.i2cReadNumber(addrI2C, NumberFormat.Int8LE);
        let buttonStatic;
        switch (button){
            case MyEnum.ButtonC:
                buttonStatic= data&0x01;
            break;
            case MyEnum.ButtonA:
                buttonStatic= (data&0x02)>>1;
            break;
            case MyEnum.ButtonB:
                buttonStatic= (data&0x04)>>2;
            break;
            default:
                buttonStatic= (data&0x08)>>3;
        }
        return buttonStatic;
    }

    /**
     * TODO: 获取方向键模拟值
     * @param button 方向键选择
     */
    //% block="get %button data"
    export function getButtonData(button: MyEnum1): number {
       let buttonData;
       switch (button){
           case MyEnum1.ButtonX:
                pins.i2cWriteNumber(addrI2C, 0xB2, NumberFormat.Int8LE);
                //basic.pause(100)
                let bufferX = pins.i2cReadBuffer(addrI2C, 2);
                buttonData = bufferX[0]<<8|bufferX[1];
           break;
           default:
                pins.i2cWriteNumber(addrI2C, 0xB3, NumberFormat.Int8LE);
                //basic.pause(50)
                let bufferY = pins.i2cReadBuffer(addrI2C, 2);
                buttonData = bufferY[0]<<8|bufferY[1];

       }
       return buttonData;
    }
}
