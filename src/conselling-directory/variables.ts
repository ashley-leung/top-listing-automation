import { By } from "selenium-webdriver";

export const logo = By.css("img.c-site-logo__image");

export const emailField = By.css("input[type='text']");
export const passwordField = By.css("input[type='password']");

export const firstNameDropDown = By.xpath(
  "//select[@name='advert_name_parts[first_name]']"
);
export const firstNameDropDownWithOption = (searchTermIndex: number) =>
  By.xpath(
    `//select[@name='advert_name_parts[first_name]']/option[${searchTermIndex}]`
  );
export const saveButton = By.css(
  "button.c-button.c-button--primary.c-button--no-spacer"
);
export const checkAvailabilityButton = By.css(
  "button.c-button.c-button--primary"
);

export const defaultTimeout = 500; // 0.5 second
