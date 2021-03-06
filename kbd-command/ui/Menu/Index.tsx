import { FC, ReactElement, useEffect, useRef, useState } from "react";
import { ArrowRight } from "ui/Icons";
import Keystroke from "ui/Keystroke";
import Window from "ui/Window";
import { ListItem, initialList } from "ui/menu/MenuData";
import cx from "clsx";

export const Menu: FC<{}> = ({}) => {
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsCommandOpen(true)}
        className="has-tooltip text-xl relative">
        <div className="tooltip px-3 py-1 mt-2 rounded absolute top-full -right-1">
          Menu
        </div>
        <span className="font-semibold text-lg">⌘</span>
      </button>

      <Window isOpen={isCommandOpen} setIsOpen={setIsCommandOpen}>
        <MenuContent />
      </Window>
    </>
  );
};

import { useMenu, MenuContext } from "ui/menu/Menu.context";
import useKeyPress from "lib/useKeyPress";

export const MenuContent: FC<{}> = ({}) => {
  const [menuList, setMenuList] = useState<ListItem[]>(initialList);
  const [activeMenuText, setActiveMenuText] = useState("Theme");

  // stores a snapshot of the current menuList - basically a stack of snapshots
  // each snapshot is an array of list items, and we store those in another array
  const [historyList, setHistoryList] = useState<ListItem[][]>([]);

  // keyboard
  const downPress = useKeyPress("ArrowDown");
  const upPress = useKeyPress("ArrowUp");
  const enterPress = useKeyPress("Enter");
  const backspacePress = useKeyPress("Backspace");

  useEffect(() => {
    if (menuList.length && downPress) {
      const activeIdx = menuList.findIndex((m) => m.text === activeMenuText);
      let newIdx = activeIdx < menuList.length - 1 ? activeIdx + 1 : activeIdx;
      // ignore the menu titles
      if (menuList[newIdx].type === "title") newIdx++;
      setActiveMenuText(menuList[newIdx].text);
    }
  }, [downPress]);

  useEffect(() => {
    if (menuList.length && upPress) {
      const activeIdx = menuList.findIndex((m) => m.text === activeMenuText);
      let newIdx = activeIdx > 0 ? activeIdx - 1 : activeIdx;
      // ignore the menu titles
      if (menuList[newIdx].type === "title") {
        newIdx--;
        // TRUE when the first element of the array is of type Title.
        // we fall back to the first menu item.
        if (!menuList[newIdx]) newIdx = 1;
      }
      setActiveMenuText(menuList[newIdx].text);
    }
  }, [upPress]);

  useEffect(() => {
    if (menuList.length && enterPress) {
      const activeMenu = menuList.find((m) => m.text === activeMenuText);
      if (activeMenu && activeMenu.inner) {
        // stack.push()
        setHistoryList([...historyList, menuList]);
        setMenuList(activeMenu.inner);
        // set the first item in the list as default active item
        setActiveMenuText(activeMenu.inner[0].text);
      }
    }
  }, [enterPress]);

  useEffect(() => {
    if (backspacePress) {
      const last = historyList.pop();
      if (last) {
        setMenuList(last);
        // set the first item in the list as default active item
        if (last[0].type !== "title") setActiveMenuText(last[0].text);
        else setActiveMenuText(last[1].text);
      }
    }
  }, [backspacePress]);

  return (
    <div className="flex flex-col h-full">
      <div className="p-3 border-b border-gray-200 dark:border-gray-700/60">
        <div className="flex space-x-2">
          <Breadcrumb text="Menu" />
          <Breadcrumb text="Work" />
        </div>
        <input
          type="text"
          placeholder="Finnnd..."
          className="bg-transparent placeholder-gray-500 caret-gray-500 text-lg font-light focus:outline-none w-full mt-3 ml-[3px]"
        />
      </div>

      <MenuContext.Provider
        value={{
          menuList,
          setMenuList,
          historyList,
          setHistoryList,
          activeMenuText,
          setActiveMenuText,
        }}>
        <div className="flex-1 max-h-[304px] overflow-y-auto py-2">
          {menuList.map((menu, index) => {
            if (!menu.type || menu.type === "menu") {
              return <MenuItem key={index} {...menu} index={index} />;
            } else {
              return <MenuTitle key={index} {...menu} />;
            }
          })}
        </div>
      </MenuContext.Provider>
    </div>
  );
};

interface MenuItemProps {
  text: string;
  kbd?: string[];
  icon?: ReactElement;
  inner?: ListItem[];
  active?: boolean;
  index?: number;
}

const MenuItem: FC<MenuItemProps> = ({ text, kbd, icon, inner, index }) => {
  const {
    menuList,
    setMenuList,
    historyList,
    setHistoryList,
    activeMenuText,
    setActiveMenuText,
  } = useMenu();

  const menuItemRef = useRef(null);

  const handleClick = () => {
    if (inner) {
      // stack.push()
      setHistoryList([...historyList, menuList]);
      // set the current menu list
      setMenuList(inner);
      // set the first item in the list as default active item
      setActiveMenuText(inner[0].text);
    }
  };

  useEffect(() => {
    if (activeMenuText === text) {
      menuItemRef.current.focus();
    }
  }, [activeMenuText]);

  return (
    <div
      tabIndex={index}
      ref={menuItemRef}
      onClick={handleClick}
      onMouseEnter={() => setActiveMenuText(text)} // TODO: debounce
      className={cx(
        "flex items-center h-12 px-4 mx-2 space-x-4 rounded-md cursor-pointer focus:outline-none",
        {
          "text-gray-900 bg-gray-100 dark:text-white dark:bg-gray-800/60":
            activeMenuText === text,
          "text-gray-400 dark:text-gray-500": activeMenuText !== text,
        }
      )}>
      {icon ? <>{icon}</> : <ArrowRight />}
      <p className="translate-y-[2px] flex-1">{text}</p>
      {kbd && <Keystroke keys={kbd} />}
    </div>
  );
};

const Breadcrumb = ({ text }: { text: string }) => (
  <span className="bg-gray-200 dark:bg-gray-800 dark:text-gray-300 text-xs font-light px-2 py-1 cursor-pointer rounded-md">
    {text}
  </span>
);

const MenuTitle = ({ text }: { text: string }) => (
  <p className="text-gray-500 font-light px-3 my-2 tracking-normal text-xs">
    {text}
  </p>
);
