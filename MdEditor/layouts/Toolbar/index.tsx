import React, { useContext, useEffect, useMemo, useRef, useState } from 'react';
import { ToolbarNames, SettingType, EditorContext } from '../../Editor';
import { goto } from '../../utils';
import { ToolDirective } from '../../utils/content-help';
import { prefix } from '../../config';
import bus from '../../utils/event-bus';
import Divider from '../../components/Divider';
import Dropdown from '../../components/Dropdown';
import Modals from '../Modals';
import { useSreenfull } from './hooks';

export interface ToolbarProp {
  prettier: boolean;
  // 工具栏选择显示
  toolbars: Array<ToolbarNames>;
  // 工具栏选择不显示
  toolbarsExclude: Array<ToolbarNames>;
  setting: SettingType;
  screenfull: any;
  screenfullJs: string;
  updateSetting: (k: keyof SettingType) => void;
  tableShape: [number, number];
}

const Toolbar = (props: ToolbarProp) => {
  const { toolbars, toolbarsExclude, setting, updateSetting } = props;
  // 获取ID，语言设置
  const { editorId, usedLanguageText } = useContext(EditorContext);
  const ult = usedLanguageText;

  // 全屏功能
  const { fullScreenHandler } = useSreenfull(props);

  const [visible, setVisible] = useState({
    title: false,
    catalog: false,
    // 图片上传下拉
    image: false,
    // 表格预选
    table: false
  });

  // 触发器
  const emitHandler = (direct: ToolDirective, params?: any) => {
    bus.emit(editorId, 'replace', direct, params);
  };

  // 链接
  const [modalData, setModalData] = useState<{
    type: 'link' | 'image' | 'help';
    linkVisible: boolean;
    clipVisible: boolean;
  }>({
    type: 'link',
    linkVisible: false,
    clipVisible: false
  });

  const toolbarLeftRef = useRef<HTMLDivElement>(null);

  let splitNum = 0;
  const barRender = (barItem: ToolbarNames) => {
    switch (barItem) {
      case '-': {
        return <Divider key={`bar-${splitNum++}`} />;
      }
      case 'bold': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.bold}
            onClick={() => {
              emitHandler('bold');
            }}
            key="bar-bold"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-bold" />
            </svg>
          </div>
        );
      }
      case 'underline': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.underline}
            onClick={() => {
              emitHandler('underline');
            }}
            key="bar-underline"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-underline" />
            </svg>
          </div>
        );
      }
      case 'italic': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.italic}
            onClick={() => {
              emitHandler('italic');
            }}
            key="bar-italic"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-italic" />
            </svg>
          </div>
        );
      }
      case 'strikeThrough': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.strikeThrough}
            onClick={() => {
              emitHandler('strikeThrough');
            }}
            key="bar-strikeThrough"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-strike-through" />
            </svg>
          </div>
        );
      }
      case 'title': {
        return (
          <Dropdown
            visible={visible.title}
            onChange={(v) => {
              setVisible({
                ...visible,
                title: v
              });
            }}
            overlay={
              <ul
                className={`${prefix}-menu`}
                onClick={() => {
                  setVisible((_vis) => {
                    return {
                      ..._vis,
                      title: false
                    };
                  });
                }}
              >
                <li
                  className={`${prefix}-menu-item`}
                  onClick={() => {
                    emitHandler('h1');
                  }}
                >
                  {ult.titleItem?.h1}
                </li>
                <li
                  className={`${prefix}-menu-item`}
                  onClick={() => {
                    emitHandler('h2');
                  }}
                >
                  {ult.titleItem?.h2}
                </li>
                <li
                  className={`${prefix}-menu-item`}
                  onClick={() => {
                    emitHandler('h3');
                  }}
                >
                  {ult.titleItem?.h3}
                </li>
                <li
                  className={`${prefix}-menu-item`}
                  onClick={() => {
                    emitHandler('h4');
                  }}
                >
                  {ult.titleItem?.h4}
                </li>
                <li
                  className={`${prefix}-menu-item`}
                  onClick={() => {
                    emitHandler('h5');
                  }}
                >
                  {ult.titleItem?.h5}
                </li>
                <li
                  className={`${prefix}-menu-item`}
                  onClick={() => {
                    emitHandler('h6');
                  }}
                >
                  {ult.titleItem?.h6}
                </li>
              </ul>
            }
            key="bar-title"
          >
            <div className={`${prefix}-toolbar-item`} title={ult.toolbarTips?.title}>
              <svg className={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-title" />
              </svg>
            </div>
          </Dropdown>
        );
      }
      case 'sub': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.sub}
            onClick={() => {
              emitHandler('sub');
            }}
            key="bar-sub"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-sub" />
            </svg>
          </div>
        );
      }
      case 'sup': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.sup}
            onClick={() => {
              emitHandler('sup');
            }}
            key="bar-sup"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-sup" />
            </svg>
          </div>
        );
      }
      case 'quote': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.quote}
            onClick={() => {
              emitHandler('quote');
            }}
            key="bar-quote"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-quote" />
            </svg>
          </div>
        );
      }
      case 'unorderedList': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.unorderedList}
            onClick={() => {
              emitHandler('unorderedList');
            }}
            key="bar-unorderedList"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-unordered-list" />
            </svg>
          </div>
        );
      }
      case 'orderedList': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.orderedList}
            onClick={() => {
              emitHandler('orderedList');
            }}
            key="bar-orderedList"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-ordered-list" />
            </svg>
          </div>
        );
      }
      case 'codeRow': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.codeRow}
            onClick={() => {
              emitHandler('codeRow');
            }}
            key="bar-codeRow"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-code-row" />
            </svg>
          </div>
        );
      }
      case 'code': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.code}
            onClick={() => {
              emitHandler('code');
            }}
            key="bar-code"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-code" />
            </svg>
          </div>
        );
      }
      case 'link': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.link}
            onClick={() => {
              setModalData({
                ...modalData,
                type: 'link',
                linkVisible: true
              });
            }}
            key="bar-link"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-link" />
            </svg>
          </div>
        );
      }
      case 'image': {
        return (
          <Dropdown
            visible={visible.image}
            onChange={(v) => {
              setVisible((_vis) => {
                return {
                  ..._vis,
                  image: v
                };
              });
            }}
            overlay={
              <ul
                className={`${prefix}-menu`}
                onClick={() => {
                  setVisible({
                    ...visible,
                    title: false
                  });
                }}
              >
                <li
                  className={`${prefix}-menu-item`}
                  onClick={() => {
                    modalData.type = 'image';
                    modalData.linkVisible = true;
                  }}
                >
                  {ult.imgTitleItem?.link}
                </li>
                <li
                  className={`${prefix}-menu-item`}
                  onClick={() => {
                    (uploadRef.current as HTMLInputElement).click();
                  }}
                >
                  {ult.imgTitleItem?.upload}
                </li>
                <li
                  className={`${prefix}-menu-item`}
                  onClick={() => {
                    modalData.clipVisible = true;
                  }}
                >
                  {ult.imgTitleItem?.clip2upload}
                </li>
              </ul>
            }
            key="bar-image"
          >
            <div className={`${prefix}-toolbar-item`} title={ult.toolbarTips?.image}>
              <svg className={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-image" />
              </svg>
            </div>
          </Dropdown>
        );
      }
      case 'table': {
        return (
          <Dropdown
            visible={visible.table}
            onChange={(v) => {
              setVisible((_vis) => {
                return {
                  ..._vis,
                  table: v
                };
              });
            }}
            key="bar-table"
            overlay={
              <div className={`${prefix}-table-shape`}>
                {new Array(props.tableShape[1]).fill('').map((_, rowIndex) => (
                  <div
                    className={`${prefix}-table-shape-row`}
                    key={`table-shape-row-${rowIndex}`}
                  >
                    {new Array(props.tableShape[0]).fill('').map((_, colIndex) => (
                      <div
                        className={`${prefix}-table-shape-col`}
                        key={`table-shape-col-${colIndex}`}
                      ></div>
                    ))}
                  </div>
                ))}
              </div>
            }
          >
            <div
              className={`${prefix}-toolbar-item`}
              title={ult.toolbarTips?.table}
              onClick={() => {
                emitHandler('table');
              }}
            >
              <svg className={`${prefix}-icon`} aria-hidden="true">
                <use xlinkHref="#icon-table" />
              </svg>
            </div>
          </Dropdown>
        );
      }
      case 'revoke': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.revoke}
            onClick={() => {
              bus.emit(editorId, 'ctrlZ');
            }}
            key="bar-revoke"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-revoke" />
            </svg>
          </div>
        );
      }
      case 'next': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.next}
            onClick={() => {
              bus.emit(editorId, 'ctrlShiftZ');
            }}
            key="bar-next"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-next" />
            </svg>
          </div>
        );
      }
      case 'save': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.save}
            onClick={() => {
              bus.emit(editorId, 'onSave');
            }}
            key="bar-save"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-baocun" />
            </svg>
          </div>
        );
      }
      case 'prettier': {
        return props.prettier ? (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.prettier}
            onClick={() => {
              emitHandler('prettier');
            }}
            key="bar-prettier"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-prettier" />
            </svg>
          </div>
        ) : (
          ''
        );
      }
      case 'pageFullscreen': {
        return (
          !setting.fullscreen && (
            <div
              className={`${prefix}-toolbar-item`}
              title={ult.toolbarTips?.pageFullscreen}
              onClick={() => {
                updateSetting('pageFullScreen');
              }}
              key="bar-pageFullscreen"
            >
              <svg className={`${prefix}-icon`} aria-hidden="true">
                <use
                  xlinkHref={`#icon-${setting.pageFullScreen ? 'suoxiao' : 'fangda'}`}
                />
              </svg>
            </div>
          )
        );
      }
      case 'fullscreen': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.fullscreen}
            onClick={fullScreenHandler}
            key="bar-fullscreen"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use
                xlinkHref={`#icon-${
                  setting.fullscreen ? 'fullScreen-exit' : 'fullScreen'
                }`}
              />
            </svg>
          </div>
        );
      }
      case 'catalog': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.catalog}
            onClick={() => {
              bus.emit(editorId, 'catalogShow');
            }}
            key="bar-catalog"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-catalog" />
            </svg>
          </div>
        );
      }
      case 'preview': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.preview}
            onClick={() => {
              updateSetting('preview');
            }}
            key="bar-preview"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-preview" />
            </svg>
          </div>
        );
      }
      case 'htmlPreview': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.htmlPreview}
            onClick={() => {
              updateSetting('htmlPreview');
            }}
            key="bar-htmlPreview"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-coding" />
            </svg>
          </div>
        );
      }
      case 'github': {
        return (
          <div
            className={`${prefix}-toolbar-item`}
            title={ult.toolbarTips?.github}
            onClick={() => goto('https://github.com/imzbf/md-editor-rt')}
            key="bar-github"
          >
            <svg className={`${prefix}-icon`} aria-hidden="true">
              <use xlinkHref="#icon-github" />
            </svg>
          </div>
        );
      }
    }
  };

  // 通过'='分割左右
  const splitedbar = useMemo(() => {
    const excluedBars = toolbars.filter((barItem) => !toolbarsExclude.includes(barItem));
    const moduleSplitIndex = excluedBars.indexOf('=');

    // 左侧部分
    const barLeft =
      moduleSplitIndex === -1 ? excluedBars : excluedBars.slice(0, moduleSplitIndex + 1);

    const barRight =
      moduleSplitIndex === -1
        ? []
        : excluedBars.slice(moduleSplitIndex, Number.MAX_SAFE_INTEGER);

    return [barLeft, barRight];
  }, [toolbars, toolbarsExclude]);

  const uploadRef = useRef<HTMLInputElement>(null);

  const uploadHandler = () => {
    bus.emit(editorId, 'uploadImage', (uploadRef.current as HTMLInputElement).files);

    // 清空内容，否则无法再次选取同一张图片
    (uploadRef.current as HTMLInputElement).value = '';
  };

  useEffect(() => {
    bus.on(editorId, {
      name: 'openModals',
      callback(type) {
        setModalData({
          ...modalData,
          type,
          linkVisible: true
        });
      }
    });

    toolbarLeftRef.current?.addEventListener('mouseover', () => {
      if (!window.getSelection()?.toString()) {
        bus.emit(editorId, 'selectTextChange', '');
      }
    });

    (uploadRef.current as HTMLInputElement).addEventListener('change', uploadHandler);
  }, []);

  return (
    <div className={`${prefix}-toolbar-wrapper`}>
      <div className={`${prefix}-toolbar`}>
        <div className={`${prefix}-toolbar-left`} ref={toolbarLeftRef}>
          {splitedbar[0].map((barItem) => barRender(barItem))}
        </div>
        <div className={`${prefix}-toolbar-right`}>
          {splitedbar[1].map((barItem) => barRender(barItem))}
        </div>
      </div>
      <input
        ref={uploadRef}
        accept="image/*"
        type="file"
        multiple={true}
        style={{ display: 'none' }}
      />
      <Modals
        linkVisible={modalData.linkVisible}
        clipVisible={modalData.clipVisible}
        type={modalData.type}
        onCancel={() => {
          setModalData({
            ...modalData,
            linkVisible: false,
            clipVisible: false
          });
        }}
        onOk={(data: any) => {
          if (data) {
            emitHandler(modalData.type, {
              desc: data.desc,
              url: data.url
            });
          }
          setModalData({
            ...modalData,
            linkVisible: false,
            clipVisible: false
          });
        }}
      />
    </div>
  );
};

export default Toolbar;
