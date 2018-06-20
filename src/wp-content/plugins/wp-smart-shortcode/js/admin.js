/** * Menu control **/(function($){       //Setup    $( '.isc-select li:first-child' ).addClass( 'isc-item-selected' );        var mouse_in_menu = false;    $( '.isc-selected' ).click( function(){                var menu   = $(this);        var cont   = menu.parents( '.isc-menu' );        var select = $( '.isc-select', cont );                if ( select.is(":visible") ) {            select.fadeOut( "fast" );            menu.removeClass( 'active' );        } else {            select.fadeIn( "fast" );            menu.addClass( 'active' );        }        return false;    });    $( '.isc-select' ).hover( function(){            mouse_in_menu = true;        }, function(){            mouse_in_menu = false;    });    $( "body" ).click(function(){        if ( ! mouse_in_menu ) {            $( '.isc-select' ).fadeOut( "fast" );            $( '.isc-selected' ).removeClass( 'active' );        }    });        $( '.isc-shortcode-menu a' ).click( function(){            var label = $(this).clone().html();                $( '.isc-selected .isc-selected-box' ).html( label );        $( '.isc-select li' ).removeClass( 'isc-item-selected' );        $(this).parents( 'li' ).addClass( 'isc-item-selected' );                //Hide Select box        $( '.isc-select' ).fadeOut( "fast" );        $( '.isc-selected' ).removeClass( 'active' );                $( '.isc-main .isc-inner' ).html( '<div id="isc-content-loader"></div>' );                //Spinner        var opts = {            lines: 11, // The number of lines to draw            length: 30, // The length of each line            width: 4, // The line thickness            radius: 19, // The radius of the inner circle            corners: 0.9, // Corner roundness (0..1)            rotate: 13, // The rotation offset            direction: 1, // 1: clockwise, -1: counterclockwise            color: '#000', // #rgb or #rrggbb            speed: 1.3, // Rounds per second            trail: 70, // Afterglow percentage            shadow: false, // Whether to render a shadow            hwaccel: false, // Whether to use hardware acceleration            className: 'isc-spinner', // The CSS class to assign to the spinner            zIndex: 2e9, // The z-index (defaults to 2000000000)            top: 'auto', // Top position relative to parent in px            left: 'auto' // Left position relative to parent in px        };        var target  = document.getElementById('isccontent');        var spinner = new Spinner( opts ).spin();        target.appendChild(spinner.el);                //Get content with ajax        var type = $(this).attr( 'href' ).replace( '#', '' );        $.ajax({            url: ajaxurl,            type: "POST",            dataType: "html",            data: 'doajax=1&ipshortcode=1&action=isc_setting&type='+type,            success: function (content) {                                $( '.isc-main .isc-inner' ).append( content );                ip_shortcode.save();                spinner.stop();            },            error: function () {                alert( "Error in Add Shortcode" );            },        });                return false;    });        $( '.isc-font-menu li' ).each( function(){            var font = $(this).data( 'font' ).replace( '_', ' ' );        $(this).css( 'font-family', font );    });        $( '.isc-font-menu li' ).click( function(){            var root  = $(this).parents( '.isc-menu');        var label = $(this).clone().html();        $( '.isc-selected .isc-selected-box', root ).html( label );        $( '.isc-select li', root ).removeClass( 'isc-item-selected' );        $(this).parents( 'li' ).addClass( 'isc-item-selected' );        $( '#isc-input-ffamily' ).val( label );                //Hide Select box        $( '.isc-select', root ).fadeOut( "fast" );        $( '.isc-selected', root ).removeClass( 'active' );    });        ip_shortcode = {            headline : function(){            var content = $( '#isc-input-content' ).val();            var color   = $( '#isc-input-color' ).val();            var font    = $( '#isc-input-font' ).val();            var ffamily = $( '#isc-input-ffamily' ).val();            var bg      = $( '.isc-input-bg:checked' ).val();            var sc = '[ip-shortcode type="headline"';            if ( color != '' ) {                sc += ' color="' + color + '"';            }            if ( font != '' ) {                sc += ' font="' + font + '"';            }            if ( ffamily != '' ) {                sc += ' fontfamily="' + ffamily + '"';            }            if ( bg != '' ) {                sc += ' bg="' + bg + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            heading : function(){            var title  = $( '#isc-input-title' ).val();            var tag    = $( '#isc-input-tag' ).val();            var style  = $( '#isc-input-style' ).val();            var align  = $( '#isc-input-align' ).val();            var sc = '[ip-shortcode type="heading"';            if ( style != '' ) {                sc += ' style="' + style + '"';            }            if ( align != '' ) {                sc += ' align="' + align + '"';            }            if ( tag != '' ) {                sc += ' tag="' + tag + '"';            }            sc += ']';            sc += title;            sc += '[/ip-shortcode]';                        return sc;        },            frame : function(){            var image  = $( '#isc-input-image' ).val();            var align  = $( '#isc-input-align' ).val();            var style  = $( '#isc-input-style' ).val();            var sc = '[ip-shortcode type="frame"';            if ( style != '' ) {                sc += ' style="' + style + '"';            }            if ( align != '' ) {                sc += ' align="' + align + '"';            }            sc += ']';            sc += image;            sc += '[/ip-shortcode]';                        return sc;        },            quote : function(){            var content = $( '#isc-input-content' ).val();            var style   = $( '#isc-input-style' ).val();            var sc = '[ip-shortcode type="quote"';            if ( style != '' ) {                sc += ' style="' + style + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            pullquote : function(){            var content = $( '#isc-input-content' ).val();            var style   = $( '#isc-input-style' ).val();            var align   = $( '#isc-input-align' ).val();            var sc = '[ip-shortcode type="pullquote"';            if ( style != '' ) {                sc += ' style="' + style + '"';            }            if ( align != '' ) {                sc += ' align="' + align + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            testimony : function(){            var author  = $( '#isc-input-author' ).val();            var content = $( '#isc-input-content' ).val();            var style   = $( '#isc-input-style' ).val();            var sc = '[ip-shortcode type="testimony"';            if ( style != '' ) {                sc += ' style="' + style + '"';            }            if ( author != '' ) {                sc += ' author="' + author + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            divider : function(){            var toplink = $( '#isc-input-toplink' ).val();            var style   = $( '#isc-input-style' ).val();            var sc = '[ip-shortcode type="divider"';            if ( style != '' ) {                sc += ' style="' + style + '"';            }            sc += ' toplink="' + toplink + '"][/ip-shortcode]';                        return sc;        },            spacer : function(){            var height = $( '#isc-input-height' ).val();            var sc = '[ip-shortcode type="spacer"';            if ( height != '' ) {                sc += ' height="' + height + '"';            }            sc += '][/ip-shortcode]';                        return sc;        },            highlight : function(){            var color   = $( '#isc-input-color' ).val();            var bgcolor = $( '#isc-input-bgcolor' ).val();            var content = $( '#isc-input-content' ).val();            var sc = '[ip-shortcode type="highlight"';            if ( color != '' ) {                sc += ' color="' + color + '"';            }            if ( bgcolor != '' ) {                sc += ' bgcolor="' + bgcolor + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            label : function(){            var style   = $( '#isc-input-style' ).val();            var content = $( '#isc-input-content' ).val();            var sc = '[ip-shortcode type="label"';            if ( style != '' ) {                sc += ' style="' + style + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            message : function(){            var content = $( '#isc-input-content' ).val();            var style   = $( '#isc-input-style' ).val();            var sc = '[ip-shortcode type="message"';            if ( style != '' ) {                sc += ' style="' + style + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            list : function(){            var content = $( '#isc-input-content' ).val();            var icon    = $( '#isc-input-icon' ).val();            var sc = '[ip-shortcode type="list"';            if ( icon != '' ) {                sc += ' icon="' + icon + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            dlist : function(){            var content = $( '#isc-input-content' ).val();            var style   = $( '#isc-input-style' ).val();            var sc = '[ip-shortcode type="dlist"';            if ( style != '' ) {                sc += ' style="' + style + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            note : function(){            var color   = $( '#isc-input-color' ).val();            var bgcolor = $( '#isc-input-bgcolor' ).val();            var content = $( '#isc-input-content' ).val();            var sc = '[ip-shortcode type="note"';            if ( color != '' ) {                sc += ' color="' + color + '"';            }            if ( bgcolor != '' ) {                sc += ' bgcolor="' + bgcolor + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            fancylink : function(){            var color   = $( '#isc-input-color' ).val();            var url     = $( '#isc-input-url' ).val();            var content = $( '#isc-input-content' ).val();            var style   = $( '#isc-input-style' ).val();            var sc = '[ip-shortcode type="fancylink"';            if ( color != '' ) {                sc += ' color="' + color + '"';            }            if ( url != '' ) {                sc += ' url="' + url + '"';            }            if ( style != '' ) {                sc += ' style="' + style + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            box : function(){            var color   = $( '#isc-input-color' ).val();            var title   = $( '#isc-input-title' ).val();            var content = $( '#isc-input-content' ).val();            var style   = $( '#isc-input-style' ).val();            var sc = '[ip-shortcode type="box"';            if ( color != '' ) {                sc += ' color="' + color + '"';            }            if ( title != '' ) {                sc += ' title="' + title + '"';            }            if ( style != '' ) {                sc += ' style="' + style + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            service : function(){            var icon    = $( '#isc-input-icon' ).val();            var title   = $( '#isc-input-title' ).val();            var content = $( '#isc-input-content' ).val();            var sc = '[ip-shortcode type="service"';            if ( icon != '' ) {                sc += ' icon="' + icon + '"';            }            if ( title != '' ) {                sc += ' title="' + title + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            column : function(){            var size    = $( '#isc-input-size' ).val();            var last    = $( '#isc-input-last:checked' ).val();            var content = $( '#isc-input-content' ).val();            var sc = '[ip-shortcode type="column"';            if ( size != '' ) {                sc += ' size="' + size + '"';            }            if ( last != undefined ) {                sc += ' last="' + last + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            dropcap : function(){            var size    = $( '#isc-input-size' ).val();            var style   = $( '#isc-input-style' ).val();            var content = $( '#isc-input-content' ).val();            var sc = '[ip-shortcode type="dropcap"';            if ( size != '' ) {                sc += ' size="' + size + '"';            }            if ( style != '' ) {                sc += ' style="' + style + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            spoiler : function(){            var title   = $( '#isc-input-title' ).val();            var style   = $( '#isc-input-style' ).val();            var content = $( '#isc-input-content' ).val();            var open = 0;            if ( $( '#isc-input-open' ).is(":checked") ) {                open = 1;            }            var sc = '[ip-shortcode type="spoiler"';            if ( title != '' ) {                sc += ' title="' + title + '"';            }            if ( style != '' ) {                sc += ' style="' + style + '"';            }            sc += ' open="' + open + '"';            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            button : function(){            var label   = $( '#isc-input-label' ).val();            var url     = $( '#isc-input-url' ).val();            var style   = $( '#isc-input-style' ).val();            var size    = $( '#isc-input-size' ).val();            var radius  = $( '#isc-input-radius' ).val();            var color   = $( '#isc-input-color' ).val();            var icon    = $( '#isc-input-icon' ).val();            var iconpos = $( '#isc-input-icon-pos' ).val();            var target  = $( '#isc-input-target' ).val();            var sc = '[ip-shortcode type="button"';            if ( url != '' ) {                sc += ' url="' + url + '"';            }            if ( style != '' ) {                sc += ' style="' + style + '"';            }            if ( size != '' ) {                sc += ' size="' + size + '"';            }            if ( radius != '' ) {                sc += ' radius="' + radius + '"';            }            if ( color != '' ) {                sc += ' color="' + color + '"';            }            if ( icon != '' ) {                sc += ' icon="' + icon + '"';            }            if ( iconpos != '' ) {                sc += ' iconpos="' + iconpos + '"';            }            if ( target != '' ) {                sc += ' target="' + target + '"';            }            sc += ']';            sc += label;            sc += '[/ip-shortcode]';                        return sc;        },            tabs : function(){            var style   = $( '#isc-input-style' ).val();            var content = $( '#isc-input-content' ).val();            var sc = '[ip-shortcode type="tabs"';            if ( style != '' ) {                sc += ' style="' + style + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            accordion : function(){            var style   = $( '#isc-input-style' ).val();            var content = $( '#isc-input-content' ).val();            var sc = '[ip-shortcode type="accordion"';            if ( style != '' ) {                sc += ' style="' + style + '"';            }            sc += ']';            sc += content;            sc += '[/ip-shortcode]';                        return sc;        },            youtube : function(){            var url       = $( '#isc-input-url' ).val();            var autostart = $( '#isc-input-autostart' ).val();            var width     = $( '#isc-input-width' ).val();            var height    = $( '#isc-input-height' ).val();            var sc = '[ip-shortcode type="youtube"';            if ( url != '' ) {                sc += ' url="' + url + '"';            }            if ( autostart != '' ) {                sc += ' autostart="' + autostart + '"';            }            if ( width != '' ) {                sc += ' width="' + width + '"';            }            if ( height != '' ) {                sc += ' height="' + height + '"';            }            sc += '][/ip-shortcode]';                        return sc;        },            gmap : function(){            var latitude  = $( '#isc-input-latitude' ).val();            var longitude = $( '#isc-input-longitude' ).val();            var width     = $( '#isc-input-width' ).val();            var height    = $( '#isc-input-height' ).val();            var sc = '[ip-shortcode type="gmap"';            if ( latitude != '' ) {                sc += ' latitude="' + latitude + '"';            }            if ( longitude != '' ) {                sc += ' longitude="' + longitude + '"';            }            if ( width != '' ) {                sc += ' width="' + width + '"';            }            if ( height != '' ) {                sc += ' height="' + height + '"';            }            sc += '][/ip-shortcode]';                        return sc;        },            tweets : function(){            var username  = $( '#isc-input-username' ).val();            var count     = $( '#isc-input-count' ).val();            var style     = $( '#isc-input-style' ).val();            var sc = '[ip-shortcode type="tweets"';            if ( style != '' ) {                sc += ' style="' + style + '"';            }            if ( count != '' ) {                sc += ' count="' + count + '"';            }            if ( username != '' ) {                sc += ' username="' + username + '"';            }            sc += '][/ip-shortcode]';                        return sc;        },            slider : function(){            var source  = $( '#isc-input-source' ).val();            var id      = 0;            if ( source == 'post' ) {                id = $( '#isc-input-post-id' ).val();            }            var size    = $( '#isc-input-size' ).val();            var count   = $( '#isc-input-count' ).val();            var speed   = $( '#isc-input-speed' ).val();            var delay   = $( '#isc-input-delay' ).val();            var link    = $( '#isc-input-link' ).val();            var sc = '[ip-shortcode type="slider"';            if ( source != '' ) {                sc += ' source="' + source + '"';            }            if ( id != '' ) {                sc += ' id="' + id + '"';            }            if ( size != '' ) {                sc += ' size="' + size + '"';            }            if ( count != '' ) {                sc += ' count="' + count + '"';            }            if ( speed != '' ) {                sc += ' speed="' + speed + '"';            }            if ( delay != '' ) {                sc += ' delay="' + delay + '"';            }            if ( link != '' ) {                sc += ' link="' + link + '"';            }            sc += '][/ip-shortcode]';                        return sc;        },                get : function(){            var type = $( '#type-shortcode' ).val();            if ( type == 'headline' ) {                sc = ip_shortcode.headline();            }             else if ( type == 'heading' ) {                sc = ip_shortcode.heading();            }             else if ( type == 'frame' ) {                sc = ip_shortcode.frame();            }             else if ( type == 'quote' ) {                sc = ip_shortcode.quote();            }             else if ( type == 'pullquote' ) {                sc = ip_shortcode.pullquote();            }             else if ( type == 'testimony' ) {                sc = ip_shortcode.testimony();            }             else if ( type == 'divider' ) {                sc = ip_shortcode.divider();            }             else if ( type == 'spacer' ) {                sc = ip_shortcode.spacer();            }             else if ( type == 'highlight' ) {                sc = ip_shortcode.highlight();            }             else if ( type == 'label' ) {                sc = ip_shortcode.label();            }             else if ( type == 'message' ) {                sc = ip_shortcode.message();            }             else if ( type == 'list' ) {                sc = ip_shortcode.list();            }             else if ( type == 'dlist' ) {                sc = ip_shortcode.dlist();            }             else if ( type == 'note' ) {                sc = ip_shortcode.note();            }             else if ( type == 'fancylink' ) {                sc = ip_shortcode.fancylink();            }             else if ( type == 'box' ) {                sc = ip_shortcode.box();            }             else if ( type == 'column' ) {                sc = ip_shortcode.column();            }             else if ( type == 'youtube' ) {                sc = ip_shortcode.youtube();            }             else if ( type == 'gmap' ) {                sc = ip_shortcode.gmap();            }             else if ( type == 'service' ) {                sc = ip_shortcode.service();            }             else if ( type == 'spoiler' ) {                sc = ip_shortcode.spoiler();            }             else if ( type == 'dropcap' ) {                sc = ip_shortcode.dropcap();            }             else if ( type == 'button' ) {                sc = ip_shortcode.button();            }             else if ( type == 'tabs' ) {                sc = ip_shortcode.tabs();            }             else if ( type == 'accordion' ) {                sc = ip_shortcode.accordion();            }             else if ( type == 'tweets' ) {                sc = ip_shortcode.tweets();            }             else if ( type == 'slider' ) {                sc = ip_shortcode.slider();            }             else {                var sc = '';            }            return sc;        },                save : function(){                    $( '.isc-button-insert' ).click( function(){                            var form = $(this).parents( '.isc-form' );                var aed  = tinyMCE.activeEditor;                if ( aed ) {                                    var content = ip_shortcode.get();                    aed.selection.setContent( content );                    jQuery( '#ip_editorForm input[type="text"]' ).val( '' );                    jQuery( '#ip_editorForm select option:first-child' ).attr( 'selected', 'selected' );                }                ip_shortcode.clearForm( form );                tb_remove();                return false;            });                        //Color picker            $('.isc-color-picker').wpColorPicker();                        //Slider setting            $( '#isc-input-source' ).change( function(){                            if ( $(this).val() == 'post' ) {                    $( '#isc-slider-post-id' ).show();                } else {                    $( '#isc-slider-post-id' ).hide();                }            });        },                clearForm : function( root ){                    $( 'input[type="text"], textarea', root ).val( '' );            $( 'input[type="checkbox"]', root ).removeAttr( 'checked' );            $( 'select option:first-child', root ).attr( 'selected', 'selected' );        },    };        ip_shortcode.save();    })(jQuery);