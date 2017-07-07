$hChoose = WinWait("Open")

ControlSetText($hChoose, "", "Edit1", $CmdLine[1])

ControlClick($hChoose, "", "[TEXT:&Open]") ;