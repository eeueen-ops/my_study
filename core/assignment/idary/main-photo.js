const photoArea =
    `
    <div class="body__menu">
        <div class="dropdown__wrapper">
            <input type="checkbox" class="dropdown__title ratio" id="dropdownTitleRatio">
                <ul class="dropdown__list" id="dropdownList">
                    <li>
                        <input type="radio" name="ratioFilter" id="basic" onclick="selectDropdownRatio(event)">
                        <label for="basic">기본형</label>
                    </li>
                    <li>
                    <input type="radio" name="ratioFilter" id="row" onclick="selectDropdownRatio(event)">
                        <label for="row">가로형</label>
                    </li>
                    <li>
                        <input type="radio" name="ratioFilter" id="column" onclick="selectDropdownRatio(event)">
                        <label for="column">세로형</label>
                    </li>
                </ul>
        </div>
    </div>
    <div class="body__photo__wrapper" id="photoWrapper"></div>
    `;